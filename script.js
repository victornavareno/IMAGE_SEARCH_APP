// ADD YOUR API KEY HERE:
// Get a FREE API from https://unsplash.com/developers
const accessKey = "5DXqI8q0RhTKpYAMuFSTKoAzEUUtnLw18LM1p4d21Fw";

// DOM Elements
const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more");

// Global Variables
let inputData = "";
let page = 1;

async function searchImages(inputData) {
  inputData = inputElement.value;

  // Creating dynamic URL for fetching images using the API:
  const url = `https://api.unsplash.com/search/photos?per_page=12&query=${inputData}&client_id=${accessKey}&page=${page}`;

  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.forEach((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("image-wrapper");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper); // Append the imageWrapper to the searchResults
  });

  // We increment the page number
  page++;

  // Now that we have a new page, we can show the show more button
  showMore.style.display = "block";
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", (e) => {
  e.preventDefault();
  searchImages();
});

// Initial search on page load (if needed)
// searchImages();
