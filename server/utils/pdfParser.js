const fs = require('fs');
const pdfParse = require('pdf-parse');

/**
 * Parses a PDF file and extracts text content.
 * @param {string} filePath - The path to the PDF file to be parsed.
 * @returns {Promise<Object>} - A promise that resolves to the extracted data.
 */
const pdf = async (filePath) => {
  try {
    // Read the PDF file
    const dataBuffer = fs.readFileSync(filePath);

    // Parse the PDF content
    const pdfData = await pdfParse(dataBuffer);

    // Extract text and split it into lines
    const lines = pdfData.text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line);

    // Process sections
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
 * If the first line is "Contact", it skips it.
 * @param {string[]} lines - Lines of text from the PDF.
 * @returns {Object} - Header information.
 */
const extractHeader = (lines) => {
    let startIndex = 0;
  
    // Skip lines that are contact information, emails, LinkedIn URLs, or portfolio URLs
    while (lines[startIndex] && (
      lines[startIndex].toLowerCase().includes('contact') ||
      lines[startIndex].includes('@') ||  // Skip email addresses
      lines[startIndex].includes('linkedin') ||  // Skip LinkedIn URLs
      lines[startIndex].includes('http') ||  // Skip any HTTP URLs
      lines[startIndex].includes('portfolio') ||  // Skip portfolio URLs
      lines[startIndex].includes('(Personal)') ||  // Skip anything that looks like '(Personal)'
      lines[startIndex].trim() === ''  // Skip empty lines
    )) {
      startIndex++;
    }
  
    // Now, capture the name, headline, and location
    let name = lines[startIndex] || 'Name not found';
    let headline = lines[startIndex + 1] || 'Headline not found';
    let location = lines[startIndex + 2] || 'Location not found';
  
    // Additional cleaning to ensure the extracted name, headline, and location do not contain URLs or emails
    if (name && (name.includes('http') || name.includes('@'))) {
      name = 'Name not found';
    }
  
    if (headline && (headline.includes('http') || headline.includes('@'))) {
      headline = 'Headline not found';
    }
  
    if (location && (location.includes('http') || location.includes('@'))) {
      location = 'Location not found';
    }
  
    // Return the filtered header
    return { name, headline, location };
  }
  
  
  
/**
 * Extracts a specific section from the PDF based on headings.
 * @param {string[]} lines - Lines of text from the PDF.
 * @param {string} startingHeading - The heading indicating the start of the section.
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

module.exports = { pdf };
