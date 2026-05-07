const express = require('express');
const path = require('path');

const app = express();

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});