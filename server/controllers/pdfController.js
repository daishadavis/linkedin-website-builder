const multer = require('multer');
const { pdf } = require('../utils/pdfParser.js');
const fs = require('fs');

const pdfController = {};

const upload = multer({ dest: 'uploads/' }); 


pdfController.uploadFile = upload.single('linkedinPDF');

  
pdfController.extractData = async (req, res, next) => {
  try {
    if (!req.file || !req.file.path) {
      console.error('No file or invalid file path received');
      return res.status(403).json({ error: 'No file uploaded or invalid file path' });
    }

    const filePath = req.file.path;
    console.log('Processing file at path:', filePath);

    // Extract data from the PDF
    const extractedData = await pdf(filePath);
    
    console.log('Extracted data:', extractedData); // Log the extracted data

    res.locals.extractedData = extractedData;

    // Clean up the uploaded file
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    next(); // Continue to the next middleware
  } catch (error) {
    console.error('Error extracting PDF data:', error);
    return res.status(500).json({ error: 'Failed to extract data from the PDF' });
  }
};

pdfController.sendExtractedData = (req, res, next) => {
 const extractedData = res.locals.extractedData;

 if (!extractedData) {
    return res.status(404).json({error: 'No extracted data available'});
 }

 res.status(200).json({data: extractedData});
}


module.exports = pdfController;