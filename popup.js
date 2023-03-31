// Get the necessary HTML elements
const urlInput = document.querySelector('#url-input');
const saveButton = document.querySelector('#save-button');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const resultsList = document.querySelector('#results-list');

// Load the saved URLs from storage, or create an empty array if none exist yet
let savedUrls = JSON.parse(localStorage.getItem('savedUrls')) || [];

// Save the current URLs to storage
function saveUrls() {
  localStorage.setItem('savedUrls', JSON.stringify(savedUrls));
}

// Add a new URL to the saved list
function addUrl(url) {
  const baseUrl = new URL(url).hostname;
  const extension = url.split('.').pop();
  savedUrls.push({ url, baseUrl, extension });
  saveUrls();
}

// Display the saved URLs in the results list
function displayResults(results) {
  resultsList.innerHTML = '';
  results.forEach(({ url, baseUrl, extension }) => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${url}" target="_blank">${baseUrl}.${extension}</a>`;
    resultsList.appendChild(li);
  });
}

// Handle the save button click event
saveButton.addEventListener('click', () => {
  const url = urlInput.value.trim();
  if (url) {
    addUrl(url);
    urlInput.value = '';
  }
});

// Handle the search button click event
searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim().toLowerCase();
  if (query) {
    const results = savedUrls.filter(({ baseUrl }) => baseUrl.toLowerCase().includes(query));
    displayResults(results);
  } else {
    displayResults(savedUrls);
  }
});

// Load the saved URLs on page load
displayResults(savedUrls);
