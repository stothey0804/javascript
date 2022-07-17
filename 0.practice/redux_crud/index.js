import { reducer } from "./reducer.js";

const store = Redux.createStore(reducer);

const init = () => {
    subject();
    TOC();
    control();
    article();
    //subscribe
    store.subscribe(article);
    store.subscribe(TOC);
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
    const state = store.getState();
    if (typeof targetId != 'undefined') {
        store.dispatch({type:'SELECT', id: state.contents[targetId].id});
    }
});

document.getElementById('control').addEventListener('click', (event) => {
    event.preventDefault;
    const targetAction = event.target.dataset.action;
    if(typeof targetAction !== 'undefined') {
        store.dispatch({type:'CHANGE_MODE', mode: targetAction});
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
    let i = 0;
    let liTags = '';


    while(i<state.contents.length) {
        liTags += `<li>
                    <a onclick="event.preventDefault()" href="#" data-id="${i}">${state.contents[i].title}</a>
                </li>`;
        i++;
    }

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
    const currId = state.currentPageId-1;
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
        content = `
        <article>
            <h2>${state.contents[currId].title}</h2>
            ${state.contents[currId].desc}
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