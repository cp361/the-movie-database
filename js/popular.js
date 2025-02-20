import { BASE_URL, options } from './info.js';

let currentPage = 1; //? Keeps track of the current page being viewed

//? Function to display the most popular movies
const displayMovies = async (page = 1) => {
  const container = document.getElementById('movies-container');
  container.innerHTML = ''; //? Clear the movies container to prepare for new content

  const fragment = document.createDocumentFragment(); //? Use a DocumentFragment to reduce DOM manipulation and improve performance

  try {
    //? Fetch movie data for the specified page from the API
    const response = await fetch(`${BASE_URL}/popular?language=en-US&page=${page}`, options);
    const data = await response.json(); //? Convert the response to a JSON object
    const movies = data.results; //? Extract the list of movies from the API response

    //? Loop through each movie and add it to the fragment
    movies.forEach(movie => {
      //? Clone the movie card template from the HTML (template tag)
      const template = document.querySelector('#movie-card-template').content.cloneNode(true);

      //? Populate the template with movie data
      template.querySelector('h3').innerText = movie.title; //? Set the movie's title
      template.querySelector('img').setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`); //? Set the movie poster URL
      template.querySelector('img').setAttribute('alt', movie.title); //? Add alt text for the movie poster
      template.querySelector('.overview').innerText = movie.overview; //? Add the movie's overview text
      template.querySelector('.popularity').innerText = movie.popularity; //? Add the movie's popularity score
      template.querySelector('.original-title').innerText = movie.original_title; //? Add the original title of the movie
      template.querySelector('.release-date').innerText = movie.release_date; //? Add the release date of the movie

      fragment.appendChild(template); //? Append the populated template to the fragment
    });

    //? Add all movies to the DOM at once to reduce reflow/repaint
    container.appendChild(fragment);

    //? Update the page number display
    document.getElementById('page-number').innerText = `Page ${page}`;
  } catch (error) {
    console.error(error); //? Log any errors to the console for debugging
  }
};

//? Function to handle the pagination buttons
const handlePagination = () => {
  //? Handle the "Previous" button click
  document.getElementById('previous').addEventListener('click', () => {
    if (currentPage > 1) { //? Ensure the page number doesn't go below 1
      currentPage--; //? Decrement the current page
      displayMovies(currentPage); //? Display the movies for the new page
    }
  });

  //? Handle the "Next" button click
  document.getElementById('next').addEventListener('click', () => {
    currentPage++; //? Increment the current page
    displayMovies(currentPage); //? Display the movies for the new page
  });
};

//? Display the first page of movies on load and activate pagination controls
displayMovies(currentPage); //? Show the movies for the first page
handlePagination(); //? Enable navigation between pages
