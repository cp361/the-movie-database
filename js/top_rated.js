import { BASE_URL, options } from './info.js';

let currentPage = 1; //? Keeps track of the current page

//? Function to display the top-rated movies
const displayMovies = async (page = 1) => {
  const container = document.getElementById('movies-container');
  container.innerHTML = ''; //? Clear the container to prepare for new content

  const fragment = document.createDocumentFragment(); //? Use a DocumentFragment to minimize DOM manipulation and improve performance

  try {
    //? Fetch top-rated movie data for the specified page from the API
    const response = await fetch(`${BASE_URL}/top_rated?language=en-US&page=${page}`, options);
    const data = await response.json(); //? Convert the response to JSON
    const movies = data.results; //? Extract the movie list from the API response

    //? Iterate over each movie and add it to the fragment
    movies.forEach(movie => {
      const template = document.querySelector('#movie-card-template').content.cloneNode(true); //? Clone the movie card template

      //? Fill the template with movie data
      template.querySelector('h3').innerText = movie.title; //? Set the movie title
      template.querySelector('img').setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`); //? Set the movie poster URL
      template.querySelector('img').setAttribute('alt', movie.title); //? Add alt text for the movie poster
      template.querySelector('.overview').innerText = movie.overview; //? Add the movie's overview
      template.querySelector('.original-title').innerText = movie.original_title; //? Add the original title
      template.querySelector('.release-date').innerText = movie.release_date; //? Add the release date
      template.querySelector('.vote-average').innerText = movie.vote_average; //? Add the movie's average rating
      template.querySelector('.vote-count').innerText = movie.vote_count; //? Add the total vote count

      fragment.appendChild(template); //? Append the filled template to the fragment
    });

    //? Add all movies to the DOM in one operation to avoid excessive reflows
    container.appendChild(fragment);

    //? Update the displayed page number
    document.getElementById('page-number').innerText = `Page ${page}`;
  } catch (error) {
    console.error(error); //? Handle and log errors in the console
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