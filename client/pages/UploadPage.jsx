import React from 'react'
import Header from '../components/Header'
import FileUpload from '../components/FileUpload'
import Footer from '../components/Footer'

const UploadPage = ({ onUploadComplete}) => {
  return (
    <div>
        <Header />
        <FileUpload onUploadComplete={onUploadComplete} />
        <Footer />
    </div>
  )
}

export default UploadPage