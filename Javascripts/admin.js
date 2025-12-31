import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const authSection = document.getElementById('authSection');
const gallerySection = document.getElementById('gallerySection');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('loginBtn');
const errorMessage = document.getElementById('errorMessage');
const photoGrid = document.getElementById('photoGrid');
const refreshBtn = document.getElementById('refreshBtn');
const logoutBtn = document.getElementById('logoutBtn');

async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    showGallery();
    loadPhotos();
  }
}

loginBtn.addEventListener('click', async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    errorMessage.textContent = 'Please enter email and password';
    return;
  }

  loginBtn.disabled = true;
  loginBtn.textContent = 'Logging in...';
  errorMessage.textContent = '';

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    showGallery();
    loadPhotos();
  } catch (error) {
    errorMessage.textContent = error.message;
    loginBtn.disabled = false;
    loginBtn.textContent = 'Login';
  }
});

logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut();
  showLogin();
});

function showGallery() {
  authSection.style.display = 'none';
  gallerySection.style.display = 'block';
}

function showLogin() {
  authSection.style.display = 'block';
  gallerySection.style.display = 'none';
  emailInput.value = '';
  passwordInput.value = '';
}

async function loadPhotos() {
  photoGrid.innerHTML = '<p class="loading">Loading photos...</p>';

  try {
    const { data: photos, error } = await supabase
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (photos.length === 0) {
      photoGrid.innerHTML = '<p class="loading">No photos yet</p>';
      return;
    }

    photoGrid.innerHTML = photos.map(photo => `
      <div class="photo-card" data-id="${photo.id}">
        <img src="${photo.image_data}" alt="Photo">
        <div class="photo-info">
          <span>${new Date(photo.created_at).toLocaleString()}</span>
          <span class="status">${photo.printed ? '✓ Printed' : 'Not printed'}</span>
        </div>
        <div class="photo-actions">
          <button class="download-btn" onclick="downloadPhoto('${photo.id}', '${photo.image_data}')">Download</button>
          <button class="mark-printed-btn ${photo.printed ? 'printed' : ''}"
                  onclick="markPrinted('${photo.id}')"
                  ${photo.printed ? 'disabled' : ''}>
            ${photo.printed ? 'Printed' : 'Mark Printed'}
          </button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    photoGrid.innerHTML = `<p class="loading">Error loading photos: ${error.message}</p>`;
  }
}

window.downloadPhoto = function(id, imageData) {
  const link = document.createElement('a');
  link.href = imageData;
  link.download = `photobooth-${id}.png`;
  link.click();
};

window.markPrinted = async function(id) {
  try {
    const { error } = await supabase
      .from('photos')
      .update({ printed: true })
      .eq('id', id);

    if (error) throw error;

    loadPhotos();
  } catch (error) {
    alert('Failed to mark as printed: ' + error.message);
  }
};

refreshBtn.addEventListener('click', loadPhotos);

document.querySelector('.logo').addEventListener('click', () => {
  window.location.href = 'index.html';
});

checkSession();
