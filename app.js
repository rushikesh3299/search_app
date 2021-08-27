const form = document.querySelector('.js-search-form');
form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault(); // prevent page from reloading when form is submitted, reloading is default form behaviour
    const searchQuery = document.querySelector('.js-search-input').value.trim();  //trim whitespaces from start & end
    document.querySelector('.js-search-results').innerHTML="";
    //https://www.mediawiki.org/wiki/API:Search#JavaScript  reference for wikipedia API

    try {
        const results = await searchWikipedia(searchQuery);
        //console.log(results);
        displayResults(results);
    } 
    catch (err) {
        //console.log(err);
        alert('Failed to search wikipedia');
    }   
}
  
async function searchWikipedia(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    return json;
}

function displayResults(results) {
    // Get a reference to the `.js-search-results` element
    const searchResults = document.querySelector('.js-search-results');
  
    // Iterate over the `search` array. Each nested object in the array can be
    // accessed through the `result` parameter
    results.query.search.forEach(result => {
      const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
  
      // Append the search result to the DOM
      searchResults.insertAdjacentHTML(
        'beforeend',
        `<div class="result-item">
          <h3 class="result-title">
            <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
          </h3>
          <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
          <span class="result-snippet">${result.snippet}</span><br>
        </div>`
      );
    });
}
  