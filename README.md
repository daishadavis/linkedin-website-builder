
# LinkedIn Website Builder 

A web application that converts a LinkedIn profile PDF into a professionally designed, one-page static website. Users upload their LinkedIn PDF, the backend extracts data from it, and the frontend injects that data into a pre-designed template. Finally, users can download a self-contained static website package (HTML and CSS) ready to deploy




## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
## Features

- PDF Upload: Upload your LinkedIn profile PDF.
- Data Extraction: The backend uses pdf-parse (with Multer) to extract text data from the PDF.
- Template Generation: Injects the extracted data into a professionally styled, one-page HTML template.
- Downloadable Website: Bundle the generated HTML and CSS into a ZIP file for easy download.
- Responsive Design: Templates are styled with custom CSS 

## Tech Stack

[![My Skills](https://skillicons.dev/icons?i=html,css,tailwind,react,nodejs,express,babel,npm,webpack&theme=light)](https://skillicons.dev)


## Installation

## Prerequisites
- Node.js (v14 + recommended)
- npm or yarn

### Setup Instructions

1. Clone the Repository

```bash
  git clone https://github.com/your-username/linkedin-website-builder.git
  cd linkedin-website-builder
```
2. Install Dependencies
 ```
 npm install
 ```
3. Start client and server
```
npm start
```
## Usage
1. Upload PDF:
On the homepage, upload your LinkedIn profile PDF.

2. Automatic Generation:
Once the upload completes, the application immediately fetches the extracted data and injects it into the default website template.

3. Preview and Download:
The generated website is displayed on-screen. Click the "Download Website" button to download a ZIP file containing index.html (with inline CSS for preview) and a separate styles.css file.

4. Deploy:
Unzip the downloaded file and host it on any static site hosting service (e.g., GitHub Pages, Vercel, Netlify).




## API Reference

#### Upload PDF and Extract Data

```http
POST /api/upload
```

| Parameter      | Type   | Description                                         |
| :------------- | :----- | :-------------------------------------------------- |
| `linkedinPDF`  | `file` | **Required**. The LinkedIn profile PDF to be uploaded. |

#### Get Extracted Data

```http
GET /api/data
```

| Parameter | Type | Description             |
| :-------- | :--- | :---------------------- |
| None      | —    | No parameters required. |

#### Get HTML Template

```http
GET /api/template/{templateName}
```

| Parameter      | Type     | Description                                                      |
| :------------- | :------- | :--------------------------------------------------------------- |
| `templateName` | `string` | **Required**. The name of the template (e.g., `template1`).        |

#### Get CSS for Template

```http
GET /api/template/{templateName}.css
```

| Parameter      | Type     | Description                                                      |
| :------------- | :------- | :--------------------------------------------------------------- |
| `templateName` | `string` | **Required**. The name of the template for its CSS file (e.g., `template1`). |


## Project Structure

```
linkedin-website-builder/
├── client/
│   ├── components/          # Reusable React components
│   ├── pages/               # Page components (e.g., UploadPage, HTMLTemplatePage)
│   ├── stylesheets/         # Global CSS files
│   ├── App.jsx              # Main React component
│   ├── index.html           # HTML entry point for the client
│   └── index.js             # Client-side JavaScript entry point
├── server/
│   ├── controllers/         # Business logic and PDF extraction controllers
│   ├── routes/              # API route definitions
│   ├── utils/               # Utility functions
│   ├── website-templates/   # HTML templates and corresponding CSS files
│   └── server.js            # Express server entry point
├── .babelrc                 # Babel configuration
├── .gitignore               # Files and folders to ignore in Git
├── package-lock.json        # npm package lock file
├── package.json             # Project dependencies and scripts
├── postcss.config.js        # PostCSS configuration (used with Tailwind CSS)
├── README.md                # Project documentation
├── tailwind.config.js       # Tailwind CSS configuration
└── webpack.config.js        # Webpack configuration
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. For major changes, open an issue first to discuss what you would like to change.


## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/)


## Contact

For any inquiries or support, please contact [Daisha Davis](https://www.linkedin.com/in/daisha-davis/)
