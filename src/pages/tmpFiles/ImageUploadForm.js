// ImageUploadForm.js
import { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = () => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send image data to the server
      const formData = new FormData();
      formData.append('image', image);
      const response = await axios.post('/api/upload/image', formData);
      // Handle successful image upload (e.g., display success message)
    } catch (error) {
      // Handle image upload error (e.g., display error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
      <button type="submit">Upload Image</button>
    </form>
  );
};

export default ImageUploadForm;
