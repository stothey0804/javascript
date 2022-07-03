const init = () => {
    subject();
    TOC();
    control();
    article();
};

const subject = () => {
    document.querySelector('#subject').innerHTML = `
    <header>
        <h1>WEB</h1>
        Hello, WEB!
    </header>
    `
}
const TOC = () => {
    document.querySelector('#toc').innerHTML = `
    <nav>
        <ol>
            <li><a href="1.html">HTML</a></li>
            <li><a href="2.html">CSS</a></li>
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
    document.querySelector('#content').innerHTML = `
    <article>
        <h2>HTML</h2>
        HTML is ...
    </article>
    `
}

init();