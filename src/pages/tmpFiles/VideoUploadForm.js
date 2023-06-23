// VideoUploadForm.js
import { useState } from 'react';
import axios from 'axios';

const VideoUploadForm = () => {
  const [video, setVideo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send video data to the server
      const formData = new FormData();
      formData.append('video', video);
      const response = await axios.post('/api/upload/video', formData);
      // Handle successful video upload (e.g., display success message)
    } catch (error) {
      // Handle video upload error (e.g., display error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setVideo(e.target.files[0])} accept="video/*" />
      <button type="submit">Upload Video</button>
    </form>
  );
};

export default VideoUploadForm;
