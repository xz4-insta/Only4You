/* =========================================
ONLY4YOU MAIN JS
========================================= */

const templates = [
  { id: "valentine", name: "Valentine 💗", description: "Red Velvet & Black aesthetic" },
  { id: "forgiveness", name: "Forgiveness 💛", description: "Deep & Meaningful" },
  { id: "epic", name: "Epic Love Story 💍", description: "Cinematic Experience" },
  { id: "anniversary", name: "Anniversary 🥂", description: "Elegant & Gold" },
  { id: "birthday", name: "Birthday 🎂", description: "Fun & Colorful" }
];

let currIndex = 0;
let items = [];

let autoPlayInterval;

export function initCarousel() {
  items = document.querySelectorAll(".carousel-item");
  
  // Initialize all iframes with their dataset.src and allow native loading="lazy" to handle performance
  items.forEach(item => {
    const iframe = item.querySelector("iframe");
    const placeholder = item.querySelector(".iframe-placeholder");
    if (iframe && iframe.dataset.src) {
      iframe.onload = () => {
         iframe.style.display = "block";
         if (placeholder) placeholder.style.display = "none";
      };
      iframe.setAttribute('src', iframe.dataset.src);
    }
  });

  updateCarousel();
  
  startAutoPlay();
  
  const container = document.querySelector(".carousel-container");
  if (container) {
    container.addEventListener("mouseenter", stopAutoPlay);
    container.addEventListener("mouseleave", startAutoPlay);
    // For mobile support, tapping the container shouldn't permanently stop it, but touchend handles it naturally or we can add touch events.
  }
}

function startAutoPlay() {
  stopAutoPlay();
  autoPlayInterval = setInterval(() => { rotateTo(currIndex + 1); }, 4000);
}

function stopAutoPlay() {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
}

export function updateCarousel() {
  const nameEl = document.getElementById("activeTitle");
  const descEl = document.getElementById("activeDesc");

  items.forEach((item, i) => {
    let diff = i - currIndex;
    let absDiff = Math.abs(diff);
    
    item.style.transform = `translateX(${diff * 60}%) scale(${1 - absDiff * 0.2}) rotateY(${diff * -15}deg)`;
    item.style.opacity = 1 - absDiff * 0.4;
    item.style.zIndex = 10 - absDiff;
    item.classList.toggle("active", i === currIndex);

    // Iframe loading is now handled centrally in initCarousel()
  });

  if(nameEl) nameEl.innerText = templates[currIndex] ? templates[currIndex].name : "";
  if(descEl) descEl.innerText = templates[currIndex] ? templates[currIndex].description : "";
}


export function rotateTo(n) {
  if (n < 0) n = items.length - 1;
  if (n >= items.length) n = 0;
  currIndex = n;
  updateCarousel();
}

export function prevTemplate() {
  rotateTo(currIndex - 1);
}

export function nextTemplate() {
  rotateTo(currIndex + 1);
}

export function goToCreateTemplate() {
  if (!templates[currIndex]) return;
  const t = templates[currIndex].id;
  window.location.href = `create.html?template=${t}`;
}
