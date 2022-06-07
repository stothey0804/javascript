import fetch from 'node-fetch';

//
const update = {
    title: 'Clarence White Techniques',
    body: 'Amazing',
    userId: 1,
}

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(update),
}

// GET
fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(data => {
        if(!data.ok) { // 200 ~ 299, IE 미지원 -> response.status 를 통해 정수값 범위 체크
            throw Error(data.status);
        }
        return data.json();
    }).then(post => {
        console.log(post.title);
    }).catch(e => {
        console.log(e);
    });


// POST

fetch('https://jsonplaceholder.typicode.com/posts', options)
    .then(data => {
        if(!data.ok) {
            throw Error(data.status);
        }
        return data.json();
    }).then(update => {
        console.log(update);
    }).catch(e => {
        console.log(e);
    });