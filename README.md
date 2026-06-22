His Safe Space Website

A modern, responsive community website for His Safe Space, designed to provide information about the organization, its mission, founder, activities, and support resources.

Features

* Responsive design for desktop, tablet, and mobile devices
* Modern and accessible user interface
* Founder profile page
* About Us page
* Get Help page
* Activities page with event listings
* Event image gallery
* Events managed through a simple JSON file
* No backend or database required
* Fast loading and easy deployment

⸻

Project Structure

His_Safe_Space/
│
├── assets/
│   └── images/
│
├── css/
│   ├── styles.css
│   ├── responsive.css
│   └── animations.css
│
├── data/
│   └── events.json
│
├── js/
│   ├── main.js
│   └── activities.js
│
├── index.html
├── founder.html
├── about.html
├── get-help.html
├── activities.html
└── README.md

⸻

Editing Events

All events displayed on the Activities page are stored in:

data/events.json

Example Event

{
  "id": "event-1",
  "title": "Global Brotherhood Program – 1st Cohort",
  "date": "2026-07-15",
  "description": "A pioneering mentorship and personal development journey bringing together young men from diverse backgrounds.",
  "images": [
    "assets/images/event-01.jpeg",
    "assets/images/event-02.jpeg"
  ]
}

Adding a New Event

1. Open:

data/events.json

2. Add a new event object following the existing format.
3. Place event images inside:

assets/images/

4. Reference the image paths correctly in the images array.
5. Save the file and redeploy the website if hosted online.

⸻

Running Locally

Because event data is loaded using JavaScript fetch requests, the website should be served through a local web server.

Option 1: Python

python -m http.server 8000

Open:

http://localhost:8000

Option 2: Node.js

npx serve .

Open the URL shown in the terminal.

⸻

Deployment

This website can be deployed on:

* Netlify
* GitHub Pages
* Cloudflare Pages

Recommended: Netlify

Simply upload the project folder or connect the GitHub repository.

⸻

Maintenance

To update content:

* Edit page content directly in the HTML files.
* Update event information in data/events.json.
* Add or replace images in assets/images.

No database or server configuration is required.

⸻

Credits

Designed and Developed by Founderz

© 2026 His Safe Space. All rights reserved.