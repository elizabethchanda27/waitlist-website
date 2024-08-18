// backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./firebase'); // Firestore setup

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../frontend')));
app.use(bodyParser.urlencoded({ extended: true }));

// Handle form submission
app.post('/submit', (req, res) => {
    const { firstName, lastName, email } = req.body;

    // Add data to Firestore
    db.collection('submissions').add({
        firstName,
        lastName,
        email
    }).then(() => {
        res.redirect('/confirmation'); // Redirect to confirmation page
    }).catch(err => {
        console.error('Error saving submission:', err);
        res.status(500).send('Error saving submission');
    });
});

app.get('/confirmation', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/confirmation.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
