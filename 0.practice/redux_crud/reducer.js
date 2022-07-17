const reducer = (state, action) => {
    // state 초기값
    if (state === undefined) {
        return {
            currentPageId: 1, // selected id 
            mode: 'create',
            maxId: 2,
            // 초기 제목
            subject: { title: 'WEB', desc: 'Hello, WEB!' },
            contents: [
                {id:1, title:'HTML', desc:'HTML is ..'},
                {id:2, title:'CSS', desc:'CSS is ..'},
            ],
        }
    }

    let newState;
    if(action.type === 'SELECT') {
        newState = {...state, mode: 'read', currentPageId: action.id || 1}
    } else if (action.type === 'CREATE') {
        // id length update
        const newMaxId = state.maxId + 1;
        // content update 
        const newContent = {
            id: newMaxId,
            title: action.title,
            desc: action.desc,
        }
        newState = { ...state, maxId: newMaxId, mode: 'read' }
        newState.contents.push(newContent);
    }

    return newState;
}

export {reducer}