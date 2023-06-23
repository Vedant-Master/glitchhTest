import { useEffect, useState } from 'react';
import axios from 'axios';

const MediaList = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    const fetchMediaFiles = async () => {
      try {
        // Fetch user's media files from the server
        const response = await axios.get('http://localhost:3001/api/media');
        let usrDet = user.email;
        const response1 = await axios.post('http://localhost:3001/api/sign-url', { usrDet });
        setMediaFiles(response.data);
        console.log("RESPONSE Media:-", response.data)
        console.log(" Signed URL RESPONSE:-", response1)
      } catch (error) {
        // Handle fetch error (e.g., display error message)
      }
    };

    fetchMediaFiles();
  }, []);

  return (
    <div>
      {mediaFiles.length ?
        (mediaFiles.map((item) => {
            return (
                <div key={item.id}>
                  <img src={item.url} alt={item.key} />
                </div>
            );
        })) : (

            <div>
                <p colSpan="2" style={{ textAlign: 'center' }}> Data Listing</p>
            </div>
        )
    }
    </div>
  );
};

export default MediaList;
