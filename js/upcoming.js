import { BASE_URL, options } from './info.js';

let currentPage = 1; //? Keeps track of the current page

//? Function to display movies
const displayMovies = async (page = 1) => {
  const container = document.getElementById('movies-container');
  container.innerHTML = ''; //? Clear the container for new movie content
  const fragment = document.createDocumentFragment(); //? Use a DocumentFragment to optimize DOM manipulation

  try {
    //? Fetch upcoming movies from the API, using the provided page parameter
    const response = await fetch(`${BASE_URL}/upcoming?language=en-US&page=${page}`, options);
    const data = await response.json(); //? Convert the response to JSON format

    //? Check if the API returned valid results
    if (!data.results || data.results.length === 0) {
      console.error("No movies found for page:", page); //? Log an error if no movies are found
      return;
    }

    const movies = data.results; //? Store the array of movie objects

    //? Iterate over the movies and add each one to the fragment
    movies.forEach(movie => {
      const template = document.querySelector('#movie-card-template').content.cloneNode(true); //? Clone the movie card template

      //? Fill the template with movie data
      template.querySelector('h3').innerText = movie.title; //? Set the movie title
      template.querySelector('img').setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`); //? Set the movie poster image source
      template.querySelector('img').setAttribute('alt', movie.title); //? Set the alt attribute for the poster image
      template.querySelector('.overview').innerText = movie.overview; //? Add the movie overview
      template.querySelector('.popularity').innerText = movie.popularity; //? Add the movie's popularity rating
      template.querySelector('.original-title').innerText = movie.original_title; //? Add the original movie title
      template.querySelector('.release-date').innerText = movie.release_date; //? Add the movie's release date

      fragment.appendChild(template); //? Add the completed template to the fragment
    });

    //? Add the entire fragment to the DOM in one operation
    container.appendChild(fragment);

    //? Update the displayed page number
    document.getElementById('page-number').innerText = `Page ${page}`;
  } catch (error) {
    console.error("Error fetching movies:", error); //? Handle and log errors in the console
  }
};

//? Function to handle pagination button clicks
const handlePagination = () => {
  //? Add event listener for the "Previous" button
  document.getElementById('previous').addEventListener('click', () => {
    if (currentPage > 1) { //? Ensure that the page number doesn’t go below 1
      currentPage--; //? Decrement the page number
      displayMovies(currentPage); //? Load movies for the new page
    }
  });

  //? Add event listener for the "Next" button
  document.getElementById('next').addEventListener('click', () => {
    currentPage++; //? Increment the page number
    displayMovies(currentPage); //? Load movies for the new page
  });
};

//? Display the movies for the first page and enable pagination controls on page load
displayMovies(currentPage); //? Show movies on the initial page
handlePagination(); //? Set up pagination buttons