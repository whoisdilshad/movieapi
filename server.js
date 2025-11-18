// server.js - Main server file
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Movies data (in-memory)
const movies = require('./data/movies');

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// GET /movies - return all movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// GET /movies/classics - return only classic movies
app.get('/movies/classics', (req, res) => {
  const classics = movies.filter(m => m.isClassic === true);
  res.json(classics);
});

// GET /movies/genres - return unique genres with counts
app.get('/movies/genres', (req, res) => {
  const genreCounts = movies.reduce((acc, m) => {
    acc[m.genre] = (acc[m.genre] || 0) + 1;
    return acc;
  }, {});
  const genres = Object.keys(genreCounts).map(name => ({ name, movieCount: genreCounts[name] }));
  res.json({ genres });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
