const fs = require('fs');
const pdfParse = require('pdf-parse');

/**
 * Parses a PDF file and extracts text content.
 * @param {string} filePath - The path to the PDF file to be parsed.
 * @returns {Promise<Object>} - A promise that resolves to the extracted data.
 */

const pdf = async (filePath) => {
    try {
        //Read the PDF file
        const dataBuffer = fs.readFileSync(filePath);

        // Parse the PDF content
        const pdfData =  await pdfParse(dataBuffer);

        //Extract text and split it onto lines
        const lines = pdfData.text.split('\n').map(line => line.trim()).filter(line => line)

        //Process sections
        const header = extractHeader(lines);
        const summary = extractSection(lines, 'Summary', ['Experience', 'Education']);
        const experience = extractSection(lines, 'Experience', ['Education', 'Skills']);
        const education = extractSection(lines, 'Education', ['Skills', 'Languages']);
        const skills = extractSection(lines, 'Skills', ['Languages', 'Certifications']);

        console.log('Header:', header);
        console.log('Summary:', summary);
        console.log('Experience:', experience);
        console.log('Education:', education);
        console.log('Skills:', skills);

        return {
            header,
            summary,
            experience,
            education,
            skills,
        };

    } catch (error) {
        console.error('Error parsing PDF:', error);
        throw new Error('Failed to parse PDF');
    }
}


/**
 * Extracts the header section (name, headline, location) from the PDF lines.
 * @param {string[]} lines - Lines of text from the PDF.
 * @returns {Object} - Header information.
 */

const extractHeader = (lines) => {
    const name = lines[0] || 'Name not found';
    const headline = lines[1] || 'Headline not found';
    const location = lines[2] || 'Location not found';

    return {name, headline, location};
}

/**
 * Extracts a specific section from the PDF based on headings.
 * @param {string[]} lines - Lines of text from the PDF.
 * @param {string} startHeading - The heading indicating the start of the section.
 * @param {string[]} stopHeadings - Headings that indicate the end of the section.
 * @returns {string[]} - Lines of text in the specified section.
 */

const extractSection = (lines, startingHeading, stopHeadings) => {
    const startIndex = lines.findIndex(line => line.includes(startingHeading));
    if (startIndex === -1) return [];

    const endIndex = lines.findIndex((line, idx) => {
        return idx > startIndex && stopHeadings.some(heading => line.includes(heading));
    });

    return lines.slice(startIndex + 1, endIndex === -1 ? lines.length : endIndex);
}

module.exports = {pdf};