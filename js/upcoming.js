import { BASE_URL, options} from './info.js';
  
  let currentPage = 1; //? Hold styr på den aktuelle side
  
  //? Funktion til at vise film
  const displayMovies = async (page = 1) => {
    const container = document.getElementById('movies-container');
    container.innerHTML = ''; //? Rens containeren
    const fragment = document.createDocumentFragment(); //? Brug fragment for at optimere DOM-manipulation
  
    try {
      //? Hent data fra API med page parameter
      const response = await fetch(`${BASE_URL}/upcoming?language=en-US&page=${page}`, options);
      const data = await response.json();
      
      if (!data.results || data.results.length === 0) {
        console.error("No movies found for page:", page);
        return;
      }
  
      const movies = data.results;
  
      //? Gennemløb filmene og tilføj dem til fragmentet
      movies.forEach(movie => {
        const template = document.querySelector('#movie-card-template').content.cloneNode(true);
  
        //? Udfyld template med filmdata
        template.querySelector('h3').innerText = movie.title;
        template.querySelector('img').setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
        template.querySelector('img').setAttribute('alt', movie.title);
        template.querySelector('.overview').innerText = movie.overview;
        template.querySelector('.popularity').innerText = movie.popularity;
        template.querySelector('.original-title').innerText = movie.original_title;
        template.querySelector('.release-date').innerText = movie.release_date;
  
        fragment.appendChild(template); //? Tilføj film til fragmentet
      });
  
      //? Tilføj fragment til DOM
      container.appendChild(fragment);
  
      //? Opdater sidetallet
      document.getElementById('page-number').innerText = `Page ${page}`;
    } catch (error) {
      console.error("Error fetching movies:", error); //? Fejlbehandling
    }
  };
  
  //? Håndter "Previous" og "Next" knapper
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
  
  //? Kør funktionen for at vise filmene på den første side
  displayMovies();  