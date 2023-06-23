import { useState } from 'react';
import axios from 'axios';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send profile data to the server
      const formData = new FormData();
      formData.append('name', name);
      formData.append('bio', bio);
      formData.append('profilePicture', profilePicture);
      const response = await axios.post('/api/profile', formData);
      // Handle successful profile update (e.g., display success message)
    } catch (error) {
      // Handle profile update error (e.g., display error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio"></textarea>
      <input type="file" onChange={(e) => setProfilePicture(e.target.files[0])} accept="image/*" />
      <button type="submit">Save</button>
    </form>
  );
};

export default ProfileForm;
