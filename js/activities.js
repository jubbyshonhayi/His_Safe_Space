const eventsList = document.getElementById('events-list');
const announcementsList = document.getElementById('announcements-list');
const galleryGrid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxClose = lightbox?.querySelector('.lightbox-close');

const galleryImages = [
  'assets/images/gallery-01.jpeg',
  'assets/images/gallery-02.jpeg',
  'assets/images/gallery-03.jpeg',
  'assets/images/gallery-04.jpeg',
  'assets/images/gallery-05.jpeg',
  'assets/images/gallery-06.png',
];


async function loadActivitiesData() {
  let events = [];

  try {
    const response = await fetch('data/events.json');

    if (!response.ok) {
      throw new Error('Failed to load events');
    }

    events = await response.json();
  } catch (error) {
    console.error('Error loading events:', error);
  }

  renderEvents(events);
  renderGallery();
}


function renderEvents(events) {
  if (!eventsList) return;
  eventsList.innerHTML = '';

  if (events.length === 0) {
    eventsList.innerHTML = '<p class="muted">No events yet.</p>';
    return;
  }

  events.forEach((event) => {

    const images = event.images || [event.image];

    const showArrows = images.length > 1;

    const imagesHtml = `
      <div class="carousel">
        ${
          showArrows
          ? '<button class="carousel-btn prev">&#10094;</button>'
          : ''
        }
        
        <img
         src="${images[0]}"
         alt="${event.title}"
         class="event-image"
         data-images='${JSON.stringify(images)}'
         data-index="0"
        >
        ${
          showArrows
          ? '<button class="carousel-btn next">&#10095;</button>'
          : ''
        }
      </div>
    `;

    const card = document.createElement('article');
    card.className = 'event-card';

    card.innerHTML = `
      <div class="event-gallery">
        ${imagesHtml}
      </div>

      <div>
        <h3>${event.title}</h3>
        <time>${event.date}</time>
        <p>${event.description}</p>
      </div>
    `;

    eventsList.appendChild(card);
  });
}

function renderAnnouncements(announcements) {
  if (!announcementsList) return;
  announcementsList.innerHTML = '';

  if (announcements.length === 0) {
    announcementsList.innerHTML = '<p class="muted">No announcements yet. Add them from the admin page.</p>';
    return;
  }

  announcements.forEach((announcement) => {
    const card = document.createElement('article');
    card.className = 'announcement-card';
    card.innerHTML = `
      <h3>${announcement.title}</h3>
      <p>${announcement.message}</p>
      <time>${announcement.date}</time>
    `;
    announcementsList.appendChild(card);
  });
}

function renderGallery() {
  if (!galleryGrid) return;
  galleryGrid.innerHTML = '';
  galleryImages.forEach((src, index) => {
    const item = document.createElement('button');
    item.className = 'gallery-item';
    item.type = 'button';
    item.innerHTML = `<img src="${src}" alt="Community event photo ${index + 1}" />`;
    item.addEventListener('click', () => openLightbox(src));
    galleryGrid.appendChild(item);
  });
}

function openLightbox(src) {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = src;
  lightbox.setAttribute('aria-hidden', 'false');
  lightbox.classList.add('active');
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
}

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('click', (e) => {
  if (!e.target.classList.contains('carousel-btn')) return;

  const carousel = e.target.closest('.carousel');
  const img = carousel.querySelector('.event-image');

  const images = JSON.parse(img.dataset.images);
  let index = parseInt(img.dataset.index, 10);

  if (e.target.classList.contains('next')) {
    index = (index + 1) % images.length;
  } else {
    index = (index - 1 + images.length) % images.length;
  }

  img.src = images[index];
  img.dataset.index = index;
});

window.addEventListener('load', loadActivitiesData);
