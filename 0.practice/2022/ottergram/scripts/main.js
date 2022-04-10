// 스크립트 동작 설계
// 1. 클릭이벤트 발생
// 2. data attr 조회 후 url 및 텍스트 얻기, 제목을 상세 이미지에 설정.

const DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
const DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
const THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

const thumnail_link = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);

// event function
document.querySelector('.thumbnail-list').addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.tagName === "A") {
        const data = e.target.dataset;
        setDetails(data.imageUrl, data.imageTitle);
    }
})

const setDetails = (imageUrl, imageTitle) => {
    'use strict';
    const detail_image = document.querySelector(DETAIL_IMAGE_SELECTOR);
    const detail_title = document.querySelector(DETAIL_TITLE_SELECTOR);
    detail_image.setAttribute('src', imageUrl);
    detail_title.innerHTML = imageTitle;
}

