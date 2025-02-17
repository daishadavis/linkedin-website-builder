const express = require('express');
const fs = require('fs');
const path = require('path');
const pdfController = require('../controllers/pdfController.js')

const router = express.Router();

// In-memory store for extracted data (not persistent, for demo purposes)
let extractedDataStore = null;

// POST route to handle file upload and data extraction
router.post('/upload', (req, res, next) => {
    console.log('Received POST request at /upload');  // Debug log to confirm the request was received
    next();  // Continue to the next middleware
}, pdfController.uploadFile, pdfController.extractData, (req, res) => {
    // Store the extracted data in a temporary in-memory store
    extractedDataStore = res.locals.extractedData;

    // Send a response after the file is uploaded and data is extracted
    res.status(200).json({
      success: 'File uploaded and data extracted successfully'
    });
});

// GET route to fetch the extracted data
router.get('/data', (req, res) => {
    if (!extractedDataStore) {
        return res.status(404).json({ error: 'No data available. Please upload a file first.' });
    }
    res.status(200).json({ data: extractedDataStore });
});

router.get('/template/:templateName', (req, res) => {
    const {templateName} = req.params;
    const templatePath = path.join(__dirname, '../website-templates', `${templateName}.html`);
    console.log('Fetching template from:', templatePath);

    fs.readFile(templatePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).json({error: 'Template not found'});
        }
        res.send(data)
    })
})

module.exports = router;
