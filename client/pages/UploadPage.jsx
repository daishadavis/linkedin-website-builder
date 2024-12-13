import React from 'react'
import Header from '../components/Header'
import FileUpload from '../components/FileUpload'
import Footer from '../components/Footer'

const UploadPage = ({ onUploadComplete}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 text-white animate-gradient bg-[length:200%_200%]">
      {/* Header */}
      <header className="w-full">
        <Header />
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-2xl px-4 py-8 bg-white text-gray-800 shadow-md rounded-lg">
          <FileUpload onUploadComplete={onUploadComplete} />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}

export default UploadPage