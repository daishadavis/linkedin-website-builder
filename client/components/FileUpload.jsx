import React from 'react'
import { useState } from 'react'

const FileUpload = () => {
    const [file, setFile] = useState()

  return (
    <div>
        <form action="post">
            <input type="file" name="linkedinPDF" id="pdf" />
        </form>
    </div>
  )
}

export default FileUpload