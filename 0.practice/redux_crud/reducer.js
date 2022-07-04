const reducer = (state, action) => {
    // state 초기값
    if (state === undefined) {
        return {
            subject: { title: 'WEB', desc: 'Hello, WEB!' },
            contents: [
                {id:1, title:'HTML', desc:'HTML is ..'},
                {id:2, title:'CSS', desc:'CSS is ..'},
            ],
            currentPageId: 1,
        }
    }

    let newState;
    if(action.type === 'CHANGE_PAGE') {
        newState = {...state, currentPageId: action.id || 1}
    }

    return newState;
}

export {reducer}