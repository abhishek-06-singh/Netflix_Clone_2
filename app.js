const banner = document.getElementById("banner");
const bannerTitle = document.getElementById("banner-title");
const bannerDescription = document.getElementById("banner-description");

const title = document.getElementById("title");
const date = document.getElementById("date");
const language = document.getElementById("language");
const rating = document.getElementById("rating");
const description = document.getElementById("description");
const close = document.getElementById("close");
const container = document.getElementById("container");
const nav = document.getElementById("nav");

const API_KEY = "e29794225c7db31bb4d8b8d7282d616f";

const baseURL = "https://api.themoviedb.org/3";

const imageUrl = "https://image.tmdb.org/t/p/original/";

const requests = [
  `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  `/discover/movie?api_key=${API_KEY}&with_genres=99`,
];

//fetching data for Rows
async function fetchData() {
  for (let i = 0; i < 8; i++) {
    const response = await fetch(`${baseURL}${requests[i]}`);
    //to read the data we use json format
    const data = await response.json();
    var movies = data.results;
    console.log(movies);
    createRows(movies, i);
  }
  return movies;
}
fetchData();

//adding data in Rows

function createRows(movies, i) {
  movies.map((movie) => {
    const imag = document.getElementById(`image${i}`);
    const poster = document.createElement("img");
    if (i > 0) {
      poster.src = `${imageUrl}${movie.backdrop_path}`;
    } else {
      poster.src = `${imageUrl}${movie.poster_path}`;
      poster.classList.add("largeImage");
    }

    poster.classList.add("image");
    imag.appendChild(poster);

    //creating about section
    poster.addEventListener("click", function () {
      console.log(movie);
      container.style.display = "flex";
      const moviePosterImg = document.getElementById("moviePosterImg");
      moviePosterImg.src = `${imageUrl}${movie.poster_path}`;
      title.textContent = movie.name || movie.original_name || movie.title;
      date.textContent = movie.first_air_date;
      language.textContent = movie.original_language;
      rating.textContent = movie.vote_average;
      description.textContent = movie.overview;
    });
  });
}

// Fetching data for banner

async function fetchBannerData() {
  const bannerResponse = await fetch(`${baseURL}${requests[0]}`);
  //to read the data we use json format
  const bannerData = await bannerResponse.json();
  const banners = bannerData.results;
  console.log(banners);
  const select = banners[Math.floor(Math.random() * banners.length)];
  console.log(select);
  banner.style.backgroundImage = `url(${imageUrl}${select.backdrop_path})`;
  bannerTitle.textContent = select.name;
  bannerDescription.textContent = select.overview;
}

fetchBannerData();

//closing the about element
close.addEventListener("click", function () {
  container.style.display = "none";
});

//navbar Animation
window.addEventListener("scroll", function () {
  if (window.scrollY) {
    nav.style.background = "#111";
  } else {
    nav.style.background = "none";
  }
});
