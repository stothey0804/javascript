// use strict - 엄격모드 사용. 

const DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
const DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
const THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

// 실행 이벤트 설정!
function initializeEvents() {
    'use strict';
    const thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    thumbnails.forEach( element => addThumbClickHandler(element));

}

const imageFromThumb = (thumbnail) => {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

const titleFromThumb = (thumbnail) => {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

const setDetailsFromThumb = (thumbnail) => {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

const addThumbClickHandler = (thumb) => {
    'use strict';
    thumb.addEventListener('click', (event) => {
        event.preventDefault();
        setDetailsFromThumb(thumb);
    });
}

const setDetails = (imageUrl, imageTitle) => {
    'use strict';
    const detail_image = document.querySelector(DETAIL_IMAGE_SELECTOR);
    const detail_title = document.querySelector(DETAIL_TITLE_SELECTOR);
    detail_image.setAttribute('src', imageUrl);
    detail_title.textContent = imageTitle;
}

initializeEvents();

