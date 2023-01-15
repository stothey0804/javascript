const backDropEl = document.getElementById('backdrop');
const addModalEl = document.getElementById('add-modal');
const deleteModalEl = document.getElementById('delete-modal');

const showModalBtn = document.querySelector('header>button');
const confirmAddMovieBtn = document.querySelector('.modal__actions .btn--success');
const cancelAddMovieBtn = document.querySelector('.modal__actions .btn--passive');

const userInputs = document.querySelectorAll('input');
const emptySection = document.getElementById('entry-text');


const toggleBackdrop = () => {
  backDropEl.classList.toggle('visible');
}

const showEmptySection = () => {
  emptySection.classList.add('visible');
};

const hideEmptySection = () => {
  emptySection.classList.remove('visible');
};


const toggleModal = () => {
  addModalEl.classList.toggle('visible');
  toggleBackdrop();
};

const backdropClickHandler = () => {
  toggleModal();
};

const cancelAddMovieHandler = () => {
  toggleModal();
};


const renderMovieElement = (htmlString) => {
  const movieListEl = document.getElementById('movie-list');
  movieListEl.insertAdjacentHTML('afterbegin', htmlString);
}

const createMovieElementString  = ({title, imageUrl, rating}) => {
  return `<li class="movie-element">
            <div class="movie-element__image">
              <img src="${imageUrl}" alt="${title}"/>
            </div>
            <div class="movie-element__info">
              <h2>${title}</h2>
              <p>${rating}</p>
            </div>
          </li>`;
}

const checkDataValidation = ({title, imageUrl, rating}) => {
  let isPassed = false;
  if (title && imageUrl && rating) {
    if(rating && rating > 0 && rating < 6) {
      isPassed = true;
    }
  } 
  return isPassed;
}

const confirmAddMovieHandler = () => {
  // update 
  const data = {
    title: userInputs[0].value.trim(),
    imageUrl: userInputs[1].value.trim(),
    rating: Number(userInputs[2].value.trim()),
  }
  if(checkDataValidation(data)) {
    renderMovieElement(createMovieElementString(data));  
    toggleModal();
  } else {
    alert('data error');
  }
}


// event handlers 
showModalBtn.addEventListener('click', toggleModal);
backDropEl.addEventListener('click', backdropClickHandler);

cancelAddMovieBtn.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieBtn.addEventListener('click', confirmAddMovieHandler);


