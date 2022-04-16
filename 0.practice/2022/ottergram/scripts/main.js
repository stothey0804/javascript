// use strict - 엄격모드 사용. 
const DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
const DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
const THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
const HIDDEN_DETAIL_CLASS = 'hidden-detail';
const ESC_KEY = 27;


const getThumbnailArray = () => {
    'use strict';
    // const thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    // const thumbnail_array = [].slice.call(thumbnails);
    return [...document.querySelectorAll(THUMBNAIL_LINK_SELECTOR)];
}
// class 추가
const hideDetails = () => {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}
const showDetails = () => {
    'use strict';
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
}

// 실행 이벤트 설정!
const initializeEvents = () => {
    'use strict';
    getThumbnailArray().forEach(addThumbClickHandler);
    addKeyPressHandler();
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
        showDetails();
    });
}

const addKeyPressHandler = () => {
    'use strict';
    // key up: 키를 땠을 때. key down: 눌렀을 때, key press: 문자키일 경우 같이 전송
    document.body.addEventListener('keyup', (event) => {
        event.preventDefault();
        if(event.keyCode === ESC_KEY) {
            hideDetails();
        }
        // console.log(event.keyCode);
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

