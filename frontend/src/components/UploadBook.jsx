import { useState } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

function UploadBook({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      await axios.post(
        `${API_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onUploadSuccess();

      alert("Book uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="upload-container">
      <label
        htmlFor="book-upload"
        className="upload-btn"
      >
        <FaUpload />

        <span>
          {uploading
            ? "Uploading..."
            : "Upload Book"}
        </span>
      </label>

      <input
        id="book-upload"
        type="file"
        accept=".pdf"
        hidden
        onChange={handleUpload}
      />
    </div>
  );
}

export default UploadBook;