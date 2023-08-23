var responsiveSlider = function() {
  var sliders = document.querySelectorAll(".slider");
  
  sliders.forEach(function(slider) {
    var sliderWidth = slider.offsetWidth;
    var slideList = slider.querySelector(".slideWrap");
    var count = 1;
    var items = slideList.querySelectorAll("li").length;
    var prev = slider.querySelector(".prev");
    var next = slider.querySelector(".next");
    var slideshowInterval;

    window.addEventListener('resize', function() {
      sliderWidth = slider.offsetWidth;
    });

    var prevSlide = function() {
      if (count > 1) {
        count = count - 2;
        slideList.style.left = "-" + count * sliderWidth + "px";
        count++;
      } else if (count === 1) {
        count = items - 1;
        slideList.style.left = "-" + count * sliderWidth + "px";
        count++;
      }
    };

    var nextSlide = function() {
      if (count < items) {
        slideList.style.left = "-" + count * sliderWidth + "px";
        count++;
      } else if (count === items) {
        slideList.style.left = "0px";
        count = 1;
      }
    };

    next.addEventListener("click", function() {
      // Clear the interval before advancing to the next slide
      clearInterval(slideshowInterval);
      nextSlide();
    });

    prev.addEventListener("click", function() {
      // Clear the interval before moving to the previous slide
      clearInterval(slideshowInterval);
      prevSlide();
    });

    // Start the slideshow and store the interval ID
    slideshowInterval = setInterval(function() {
      nextSlide();
    }, 5000);

    // Modal functionality
    var images = slideList.querySelectorAll("li img");
    var modal = document.getElementById("myModal");
    var modalImage = document.getElementById("modalImage");
    var closeBtn = document.getElementsByClassName("close")[0];

    images.forEach(function(image, index) {
      image.addEventListener("click", function() {
        modal.style.display = "block";
        modalImage.src = image.src;
        count = index; // Update the count to the clicked image index
      });
    });

    closeBtn.addEventListener("click", function() {
      modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

  });
};

window.onload = function() {
  responsiveSlider();
};
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("myModal").style.display = "none";
});


import imageDescriptions from './images.js'; 

// Your existing slider initialization code
const sliders = document.querySelectorAll(".slider");
$(sliders).each(function () {
  const slider = $(this);
  const folder = slider.data("folder");
  const slideWrap = slider.find(".slideWrap");
  const prevButton = slider.find(".prev");
  const nextButton = slider.find(".next");
  console.log(imageDescriptions)
  console.log(slider)
  // Find the corresponding container description
  const containerDescription = imageDescriptions.find(desc => desc.folder === folder);

  if (containerDescription) {
    // Your code to loop through images and descriptions goes here
  } else {
    console.error(`Container description not found for folder: ${folder}`);
  }

  // Clear any existing content in the slideWrap
  slideWrap.html(''); // Clear previous content

  // Loop through the image descriptions for this container

  for (const imageSrc in containerDescription.images) {
    if (containerDescription.images.hasOwnProperty(imageSrc)) {

      const description = containerDescription.images[imageSrc];
      const listItem = `
        <li>
          <img src="/apple/img/${folder}/${imageSrc}" alt="">
          <div class="text-overlay">${description}</div>
        </li>
      `;
      slideWrap.append(listItem);
    }
  }

  // Initialize the slider logic for this box
  initializeSlider(slider);
});


function initializeSlider(slider) {
  const slideWrap = slider.find(".slideWrap");
  const prevButton = slider.find(".prev");
  const nextButton = slider.find(".next");
  let currentPosition = 0;

  function updateSliderPosition() {
    slideWrap.css("left", -currentPosition * 100 + "%");
  }

  nextButton.click(function (event) {
    event.preventDefault(); // Prevent the default anchor link behavior
    if (currentPosition < slideWrap.children().length - 1) {
      currentPosition++;
      updateSliderPosition();
    }
  });

  prevButton.click(function (event) {
    event.preventDefault(); // Prevent the default anchor link behavior
    if (currentPosition > 0) {
      currentPosition--;
      updateSliderPosition();
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  // Get references to all toggle buttons
  const toggleButtons = document.querySelectorAll('.toggle-button');
  
  // Add a click event listener to each toggle button
  toggleButtons.forEach(function(toggleButton) {
    toggleButton.addEventListener('click', function() {
      // Find the closest container to the clicked button
      const container = toggleButton.closest('.container');
      if (container) {
        // Toggle the visibility of the closest container
        container.classList.toggle('hidden');
      }
    });
  });
});


// Get a reference to the button element
const toggleButton = document.getElementById('toggleButton');

// Get references to all hidden container elements
const containers = document.querySelectorAll('.container');

// Get a reference to the audio element
const audio = new Audio('audio/floppy.mp3');

// Track the number of containers that have finished toggling
let containersToggled = 0;

// Function to toggle color inversion
function toggleInvert() {
  const image = toggleButton.querySelector('.right-icon');
  image.classList.add('invert-colors');
  setTimeout(() => {
    image.classList.remove('invert-colors');
  }, 200); // Remove inversion after 200 milliseconds (double-click speed)
}

// Function to toggle container visibility with a random delay between each toggle
function toggleContainersWithRandomDelay() {
  // Call the toggleInvert function first
  toggleInvert();

  // Play the audio sound
  audio.play();

  // Reset the count of containers that have finished toggling
  containersToggled = 0;

  // Toggle the 'hidden' class on each container with a random delay
  containers.forEach(function(container) {
    const randomDelay = Math.floor(Math.random() * 5901) + 1000; // Random delay between 100 and 1000 milliseconds
    setTimeout(() => {
      container.classList.toggle('hidden');
      // Check if all containers are toggled (no open containers)
      if (++containersToggled === containers.length) {
        // Stop the audio when all containers are toggled
        audio.pause();
      }
    }, randomDelay);
  });
}

// Add a click event listener to the button to trigger the combined actions
toggleButton.addEventListener('click', toggleContainersWithRandomDelay);
