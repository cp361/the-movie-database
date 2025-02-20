import { BASE_URL, options } from './info.js';

let currentPage = 1; //? Hold styr på den aktuelle side

//? Funktion til at vise de mest populære film
const displayMovies = async (page = 1) => {
  const container = document.getElementById('movies-container');
  container.innerHTML = ''; //? Rens containeren

  const fragment = document.createDocumentFragment(); //? Brug fragment til at reducere DOM-manipulation

  try {
    //? Hent data fra API for den ønskede side
    const response = await fetch(`${BASE_URL}/now_playing?language=en-US&page=${page}`, options);
    const data = await response.json();
    const movies = data.results;

    //? Gennemløb filmene og tilføj dem til fragmentet
    movies.forEach(movie => {
      const template = document.querySelector('#movie-card-template').content.cloneNode(true);

      //? Udfyld data i template
      template.querySelector('h3').innerText = movie.title;
      template.querySelector('img').setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
      template.querySelector('img').setAttribute('alt', movie.title);
      template.querySelector('.overview').innerText = movie.overview;
      template.querySelector('.original-title').innerText = movie.original_title;
      template.querySelector('.release-date').innerText = movie.release_date;

      fragment.appendChild(template); //? Tilføj hver film til fragmentet
    });

    //? Tilføj alle film til DOM på én gang
    container.appendChild(fragment);

    //? Opdater sidevisning
    document.getElementById('page-number').innerText = `Page ${page}`;

  } catch (error) {
    console.error(error); //? Fejlbehandling
  }
};

//? Funktion til at håndtere knapperne til pagination
const handlePagination = () => {
  document.getElementById('previous').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayMovies(currentPage);
    }
  });

  document.getElementById('next').addEventListener('click', () => {
    currentPage++;
    displayMovies(currentPage);
  });
};

//? Kør funktionen for at vise filmene på første side og aktivér pagination
displayMovies(currentPage);
handlePagination();
