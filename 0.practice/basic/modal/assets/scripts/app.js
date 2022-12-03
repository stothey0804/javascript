const backDropEl = document.getElementById('backdrop');
const modalEl = document.getElementById('add-modal');

const showModalBtn = document.querySelector('header>button');
const addMovieBtn = document.querySelector('.modal__actions .btn--success');
const cancelBtn = document.querySelector('.modal__actions .btn--passive');

const closeModal = () => {
  backDropEl.style.display = 'none';
  modalEl.style.display = 'none';  
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

const updateMovieList = () => {
  // update 
  const data = {
    title: document.getElementById('title').value,
    imageUrl: document.getElementById('image-url').value,
    rating: document.getElementById('rating').value,
  }

  renderMovieElement(createMovieElementString(data));  

  closeModal();
}


// event handlers 
showModalBtn.addEventListener('click', () => {
  backDropEl.style.display = 'block';
  modalEl.style.display = 'block';  
});

cancelBtn.addEventListener('click', closeModal);
addMovieBtn.addEventListener('click', updateMovieList);


