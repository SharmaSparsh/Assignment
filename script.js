// Destination Explorer Web App
// Features: Category & rating filters, expandable cards, image carousel, scroll-to-top
// Author: [Your Name]

let allPlaces = [];

// Fetch and load data on page load
document.addEventListener("DOMContentLoaded", () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            allPlaces = data;
            displayPlaces(allPlaces);
        });

    // Show scroll-to-top button on scroll
    window.addEventListener('scroll', () => {
        const btn = document.getElementById('scrollToTop');
        btn.style.display = window.scrollY > 200 ? 'block' : 'none';
    });
});

// Render place cards dynamically
function displayPlaces(places) {
    const container = document.getElementById('places-container');
    container.innerHTML = '';

    places.forEach(place => {
        const card = `
      <div class="card">
        ${Array.isArray(place.image) ? `
          <div class="carousel">
            ${place.image.map(img => `<img src="${img}" alt="${place.name}">`).join('')}
          </div>
        ` : `<img src="${place.image}" alt="${place.name}">`}

        <div class="card-content">
          <h3>${place.name}</h3>
          <p>${place.category} | ⭐ ${place.rating}</p>

          <p class="short-text">${place.description.slice(0, 50)}...</p>
          <p class="full-text" style="display:none;">${place.description}</p>
          <button class="toggle-btn" onclick="toggleDetails(this)">More</button>
        </div>
      </div>`;
        container.innerHTML += card;
    });
}

// Category filter function
function filterPlaces(category) {
    if (category === 'all') {
        displayPlaces(allPlaces);
    } else {
        const filtered = allPlaces.filter(place => place.category === category);
        displayPlaces(filtered);
    }
}

// Rating filter function
function filterByRating(minRating) {
    if (minRating === 'all') {
        displayPlaces(allPlaces);
    } else {
        const filtered = allPlaces.filter(place => place.rating >= parseFloat(minRating));
        displayPlaces(filtered);
    }
}

// Expandable details (More/Less)
function toggleDetails(btn) {
    const shortText = btn.previousElementSibling.previousElementSibling;
    const fullText = btn.previousElementSibling;

    if (fullText.style.display === "none") {
        fullText.style.display = "block";
        shortText.style.display = "none";
        btn.textContent = "Less";
    } else {
        fullText.style.display = "none";
        shortText.style.display = "block";
        btn.textContent = "More";
    }
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}