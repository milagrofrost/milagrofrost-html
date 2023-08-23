// screensaver.js

// Variables to track mouse movement and overlay timer
let overlayTimer;
let screensaverVisible = false; // Track if screensaver is currently visible

// Function to show the screensaver
function showScreensaver() {
    // Load screensaver.html into an iframe
    const iframe = document.createElement('iframe');
    iframe.src = 'screensaver.html';
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';

    // Append the iframe to the overlay
    const overlay = document.getElementById('overlay');
    overlay.innerHTML = ''; // Clear any previous content
    overlay.appendChild(iframe);

    overlay.style.display = 'block';
    screensaverVisible = true;
}

// Function to hide the screensaver
function hideScreensaver() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    overlay.innerHTML = ''; // Clear the iframe
    screensaverVisible = false;
}

// Function to reset the overlay timer
function resetOverlayTimer() {
    clearTimeout(overlayTimer);
    overlayTimer = setTimeout(showScreensaver, 20000); // Adjust the time in milliseconds
}

// Function to handle mousemove event
function handleMouseMove() {
    if (screensaverVisible) {
        hideScreensaver();
    }

    resetOverlayTimer();
}

// Event listener for mousemove
document.addEventListener('mousemove', handleMouseMove);
// Event listener for mousemove on the overlay
document.getElementById('overlay').addEventListener('mousemove', handleMouseMove);

// Initial setup
resetOverlayTimer();
