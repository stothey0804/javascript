import { reducer } from "./reducer.js";

const store = Redux.createStore(reducer);

const init = () => {
    subject();
    TOC();
    control();
    article();
    //subscribe
    store.subscribe(article);
};

const subject = () => {
    const state = store.getState();
    document.querySelector('#subject').innerHTML = `
    <header>
        <h1>${state.subject.title}</h1>
        ${state.subject.desc}
    </header>
    `
}


document.getElementById('toc').addEventListener('click', function (e) {
    e.preventDefault;
    const targetId = e.target.dataset.id;
    const state = store.getState();
    if (typeof targetId != 'undefined') {
        store.dispatch({type:'CHANGE_PAGE', id: state.contents[targetId].id});
    }
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
        <li><a href="/create">create</a></li>
        <li><input type="button" value="delete"></li>
    </ul>
    `;
}
const article = () => {
    const state = store.getState();
    const currId = state.currentPageId-1;
    document.querySelector('#content').innerHTML = `
    <article>
        <h2>${state.contents[currId].title}</h2>
        ${state.contents[currId].desc}
    </article>
    `
}

init();