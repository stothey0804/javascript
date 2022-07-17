import { reducer } from "./reducer.js";

const store = Redux.createStore(reducer);

const init = () => {
    subject();
    TOC();
    control();
    article();
    //subscribe
    store.subscribe(TOC);
    store.subscribe(article);
}

const subject = () => {
    const state = store.getState();
    document.querySelector('#subject').innerHTML = `
    <header>
        <h1>${state.subject.title}</h1>
        ${state.subject.desc}
    </header>
    `
}


document.getElementById('toc').addEventListener('click', (e) => {
    e.preventDefault;
    const targetId = e.target.dataset.id;
    console.log('target id:', targetId);
    if (typeof targetId != 'undefined') {
        store.dispatch({type:'SELECT', id: Number(targetId)});
    }
});

// create & delete
document.getElementById('control').addEventListener('click', (event) => {
    event.preventDefault;
    const targetAction = event.target.dataset.action;
    if(targetAction === 'create') {
        store.dispatch({type:'CHANGE_MODE', mode: targetAction});
    } else if (targetAction === 'delete') {
        store.dispatch({type:'DELETE'})
    }
});


// submit
document.addEventListener('submit', (event) => {
    event.preventDefault;
    const _title = event.target.title.value;
    const _desc = event.target.desc.value;
    console.log(_title, _desc);
    store.dispatch({type:'CREATE', title: _title, desc: _desc});
});



const TOC = () => {
    const state = store.getState();
    let liTags = '';

    state.contents.forEach(item => {
        liTags += `<li>
                    <a onclick="event.preventDefault()" href="#" data-id="${item.id}">${item.title}</a>
                </li>`;
    });


    document.querySelector('#toc').innerHTML = `
    <nav>
        <ol>
            ${liTags}
        </ol>
    </nav>
    `;
}
const control = () => {
    document.querySelector('#control').innerHTML = `
    <ul>
        <li><a onclick="event.preventDefault()" href="/create" data-action="create">create</a></li>
        <li><input onclick="event.preventDefault()" type="button" value="delete" data-action="delete"></li>
    </ul>
    `;
}
const article = () => {
    const state = store.getState();
    const currId = state.currentPageId;
    let content;

    if(state.mode === 'create') {
        content = `
        <article>
            <form id="createForm" onsubmit="event.preventDefault()">
                <p>
                    <input type="text" name="title" placeholder="title">
                </p>
                <p>
                   <textarea name="desc" placeholder="description"></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>
        </article>
        `;

    } else if(state.mode === 'read') {
        console.log('SELECT, now: ', state);
        const contentData = state.contents.find((item) => item.id === currId);
        content = `
        <article>
            <h2>${contentData.title}</h2>
            ${contentData.desc}
        </article>
        `
    } else if(state.mode === 'welcome') {
        content = `
        <article>
            <h2>Welcome</h2>
            hello redux~!
        </article>
        `;
    }

    document.querySelector('#content').innerHTML = content;
}

init();