// Step 1 - import express
const express = require('express');

// Step 2 - create app
const app = express();

// Step 3 - tell express to serve files from current folder
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Step 4 - when someone visits "/" show index.html
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Step 5 - start server on port 3000
app.listen(3000, function() {
  console.log('Server running at http://localhost:3000');
});
