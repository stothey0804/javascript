const reducer = (state, action) => {
    // state 초기값
    if (state === undefined) {
        return {
            currentPageId: 0, // selected id 
            mode: 'welcome',
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
        newState = {...state, 
            mode: 'read', 
            currentPageId: action.id,
        }
        console.log('update currId:', action.id);
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
    } else if (action.type === 'DELETE') {
        if (state.currentPageId != 0) {
            // 삭제 
            newState = { ...state};
            const newContents = newState.contents.filter((item) => item.id != state.currentPageId );
            const newMaxId = newContents[newContents.length - 1].id;
            newState = { ...state, 
                contents: newContents, 
                mode: 'welcome',
                maxId: newMaxId,
                currentPageId: 0, 
            }
        }
    } else if (action.type === 'CHANGE_MODE') {
        const _mode = action.mode;
        newState = { ...state, mode: _mode};
    }

    return newState;
}

export {reducer}