function loadGifs() {
    const gifContainer = document.body;
    const gifFolder = '/clouds/img/';
    let gifFiles = [];

    fetch('/clouds/img/gifs.json') // Fetch the JSON file
        .then(response => response.json())
        .then(data => {
            gifFiles = data.gifs; // Extract the list of GIF filenames
            displayGifs(); // Initial display of GIFs
        })
        .catch(error => {
            console.error('Error loading GIFs:', error);
        });

    // Function to display GIFs at random positions within relative page borders
    function displayGifs() {
        gifContainer.innerHTML = ''; // Clear existing GIFs

        gifFiles.forEach(filename => {
            const gif = document.createElement('img');
            gif.src = gifFolder + filename;
            gif.style.position = 'absolute';
            gif.style.left = `${Math.random() * (window.innerWidth - 200)}px`; // Adjust 200 for GIF width
            gif.style.top = `${Math.random() * (window.innerHeight - 200)}px`; // Adjust 200 for GIF height
            gif.style.zIndex = 1;
            gif.style.width = '200px'; // Adjust width as needed
            gif.style.height = 'auto';

            gifContainer.appendChild(gif);
        });
    }

    // Load GIFs when the page loads
    window.addEventListener('load', displayGifs);

    // Reposition GIFs when the window is resized
    window.onresize = displayGifs;
}

// Load GIFs when the page loads
window.addEventListener('load', loadGifs);
