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
    const targetAction = e.target.dataset.action;
    if(typeof targetAction == 'create') {
        //
        
    }
});

// submit
document.addEventListener('submit', (event) => {
    event.preventDefault;
    const _title = e.target.title.value;
    const _desc = e.target.desc.value;
    console.log(_title, _desc);
    store.dispatch({type:'CREATE', title: _title, desc: _desc});
});



const TOC = () => {
    const state = store.getState();
    let i = 0;
    let liTags = '';


    while(i<state.contents.length) {
        liTags += `<li>
                    <a href="#" data-id="${i}">${state.contents[i].title}</a>
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
        <li data-action="create"><a href="/create">create</a></li>
        <li data-action="delete"><input type="button" value="delete"></li>
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
            <form id="createForm">
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
    }

    document.querySelector('#content').innerHTML = content;
}

init();