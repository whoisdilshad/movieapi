// app.js - frontend logic to fetch API endpoints and display results
const output = document.getElementById('output');
const btnAll = document.getElementById('btnAll');
const btnClassics = document.getElementById('btnClassics');
const btnGenres = document.getElementById('btnGenres');

function showError(msg) {
  output.innerHTML = `<div class="error">Error: ${msg}</div>`;
}

function renderMovies(movies) {
  if (!movies || movies.length === 0) {
    output.innerHTML = '<div>No movies found.</div>';
    return;
  }
  output.innerHTML = '';
  movies.forEach(m => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <div>
        <div style="font-weight:700">${m.title} <span class="meta">(${m.releaseYear})</span></div>
        <div class="meta">${m.genre} • Director: ${m.director}</div>
      </div>
      <div>
        ${m.isClassic ? '<span class="badge">Classic</span>' : ''}
        <div class="meta" style="text-align:right">Released: ${m.releaseYear}</div>
      </div>
    `;
    output.appendChild(div);
  });
}

function renderGenres(payload) {
  if (!payload || !payload.genres || payload.genres.length === 0) {
    output.innerHTML = '<div>No genres found.</div>';
    return;
  }
  output.innerHTML = '<div class="genres-list"></div>';
  const container = output.querySelector('.genres-list');
  payload.genres.forEach(g => {
    const p = document.createElement('div');
    p.className = 'genre-pill';
    p.innerHTML = `<strong>${g.name}</strong><div class="meta">Movies: ${g.movieCount}</div>`;
    container.appendChild(p);
  });
}

async function fetchAndRender(path, renderer) {
  try {
    output.innerHTML = '<div>Loading...</div>';
    const res = await fetch(path);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    renderer(data);
  } catch (err) {
    console.error(err);
    showError(err.message || 'Failed to fetch data');
  }
}

btnAll.addEventListener('click', () => fetchAndRender('/movies', renderMovies));
btnClassics.addEventListener('click', () => fetchAndRender('/movies/classics', renderMovies));
btnGenres.addEventListener('click', () => fetchAndRender('/movies/genres', renderGenres));

// Load all movies on first visit
fetchAndRender('/movies', renderMovies);
