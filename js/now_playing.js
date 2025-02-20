import { BASE_URL, options } from './info.js';

let currentPage = 1; //? Keeps track of the current page being viewed

//? Function to display the most popular movies
const displayMovies = async (page = 1) => {
  const container = document.getElementById('movies-container');
  container.innerHTML = ''; //? Clear the movies container to prepare for new content

  const fragment = document.createDocumentFragment(); //? Use a DocumentFragment to minimize DOM manipulation

  try {
    //? Fetch movie data for the specified page from the API
    const response = await fetch(`${BASE_URL}/now_playing?language=en-US&page=${page}`, options);
    const data = await response.json(); //? Convert the response to a JSON object
    const movies = data.results; //? Extract the list of movies from the API response

    //? Loop through each movie and add it to the fragment
    movies.forEach(movie => {
      //? Clone the movie card template (template tag from HTML)
      const template = document.querySelector('#movie-card-template').content.cloneNode(true);

      //? Populate the template with movie data
      template.querySelector('h3').innerText = movie.title; //? Set the movie's title
      template.querySelector('img').setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`); //? Set the movie poster
      template.querySelector('img').setAttribute('alt', movie.title); //? Add alt text for accessibility
      template.querySelector('.overview').innerText = movie.overview; //? Add the movie's overview
      template.querySelector('.original-title').innerText = movie.original_title; //? Add the original title
      template.querySelector('.release-date').innerText = movie.release_date; //? Add the release date

      fragment.appendChild(template); //? Append the fully populated template to the fragment
    });

    //? Add all movies to the DOM at once
    container.appendChild(fragment);

    //? Update the page number display
    document.getElementById('page-number').innerText = `Page ${page}`;
  } catch (error) {
    console.error(error); //? Handle errors by logging them to the console
  }
};

//? Function to handle the pagination buttons
const handlePagination = () => {
  //? Handle the "Previous" button click
  document.getElementById('previous').addEventListener('click', () => {
    if (currentPage > 1) { //? Ensure the user cannot go below page 1
      currentPage--; //? Decrement the page number
      displayMovies(currentPage); //? Display movies for the new page
    }
  });

  //? Handle the "Next" button click
  document.getElementById('next').addEventListener('click', () => {
    currentPage++; //? Increment the page number
    displayMovies(currentPage); //? Display movies for the new page
  });
};

//? Display the first page of movies when the page is loaded and activate pagination controls
displayMovies(currentPage); //? Show the movies on the first page
handlePagination(); //? Enable navigation between pages
