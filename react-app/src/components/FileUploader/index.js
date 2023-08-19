import { useRef } from 'react';
import "./FileUploader.css";

const FileUploader = ({ buttonText, file, setFile, acceptFileTypes }) => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (e) => {
    e.preventDefault();
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (e) => {
    const fileUploaded = e.target.files[0];
    setFile(fileUploaded);
  };

  //

  const selectedFileName = file ? `("${file.name}" has been selected)` : "(No file chosen)";

  return (
    <div className="file-uploader-container hover-shadow">
      <button className="file-uploader-button " onClick={handleClick}>
        {buttonText}
        {file && <i className="fa-solid fa-circle-check fa-2x file-uploader-success"></i>}
      </button>
      <p>{selectedFileName}</p>
      <input
        type="file"
        accept={acceptFileTypes}
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: 'none' }} // Make the file input element invisible
        required
      />
    </div>
  )
}

export default FileUploader;