# Underwater Photobooth Web App 🐠

An underwater-themed photobooth web application built with vanilla HTML, CSS, and JavaScript. Add cute sea creatures and bubbles to your photos and download them as a photo strip🐡

## Features
- Live camera preview and photo capture
- Upload custom photos
- Add + drag and drop stickers
- Send photos to admin gallery for printing
- Admin page to view, download, and manage all uploaded photos
- Fully responsive design

## Demo
[http://photobooth.nashallery.com](http://photobooth.nashallery.com)

## Getting Started
**Important:** This app uses your camera. You cannot open the HTML file directly in a browser due to camera permissions. You need to serve it with a local server.

### Requirements
- Node.js installed (for `npx serve`)

### How to run the project locally
1. Open a terminal in your project folder:
   ```bash
   cd path/to/photobooth-github-tutorial
   npx serve
2. Open the URL shown in the terminal (usually http://localhost:3000) in a browser.

3. Allow camera access when prompted.

### Admin Access
To view and download uploaded photos:
1. Navigate to `/admin.html` in your browser
2. View all uploaded photos, download them for printing, and mark them as printed

Photos are stored in a Supabase database and can be accessed from any device with the admin link.

## License

This project is licensed for **educational and personal use only**.  

- Users are free to **view, modify, and add to the code** for learning or personal projects. 
- **Commercial use is strictly prohibited**: you may **not sell, distribute, or use this code** in any commercial product or for-profit purpose.  
- Any modifications or additions must also comply with this license and cannot be used commercially.  

By using this project, you agree to these terms.
