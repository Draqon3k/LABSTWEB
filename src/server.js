const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing multipart/form-data
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/'); // Save uploaded files to the 'uploads' directory
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`); // Use a unique filename
        },
    }),
});

// Upload endpoint
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    const imagePath = path.join(__dirname, req.file.path);
    // Save metadata to database or return image path
    res.send({ imagePath });
});

// Serve images endpoint
app.get('/images/:filename', (req, res) => {
    const imagePath = path.join(__dirname, 'uploads', req.params.filename);
    if (!fs.existsSync(imagePath)) {
        return res.status(404).send('Image not found');
    }
    res.sendFile(imagePath);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
