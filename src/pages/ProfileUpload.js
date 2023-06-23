import React, { useState } from 'react';
import axios from 'axios';

// TMP=--------------
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";
// ---------------------

// AWS S3 Config -----
import S3FileUpload from 'react-s3'; 
//Optional Import
import { uploadFile } from 'react-s3';
 window.Buffer = window.Buffer || require("buffer").Buffer;




const ProfileUpload = (props) => {
  const [imageData, setImageData] = useState(null);
  let formData = new FormData();
  
  // const [user, setUserData] = useState(null);
  // setUserData(localStorage.getItem('user'));  
  const user = JSON.parse(localStorage.getItem('user'));
  
  const handleFileChange = (file) => {
    
    // setImageData(e.target.files[0]);
    console.log("File:-----",file.target.files[0]);
    var fileData = file.target.files[0];
    console.log("FileData:-----",fileData);
    console.log("USR:-----",user.email);
    const config = {
      bucketName: 'for-test-development',
      dirName: user['email'], /* optional */
      region: 'ap-south-1',
      accessKeyId: 'AKIARVAS5GDK4ULCBAVV',
      secretAccessKey: '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',
    }
    // TMP--------------------
    const tmpData = {Bucket:'for-test-development',Key:user.email+"/"+fileData.name,Body:fileData};
    const cred = {accessKeyId: 'AKIARVAS5GDK4ULCBAVV', secretAccessKey: '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'};

    try{
      const uploadFileData = new Upload({
        client : new S3Client({region:"ap-south-1", credentials: cred}),
        leavePartsOnError: false,
        params: tmpData,
      });

      uploadFileData.on("httpUploadProgress",(progress) =>{
        console.log("Prog:-----",progress);
      });

      uploadFileData.done();
    }
    catch(e){
      console.log("Error Occoured:-",e)
    }

    // formData.append('imageData', e.target.files[0]);
    /*const responseData = S3FileUpload
    .uploadFile('./images/1.jpg', config)
    .then(data => console.log(data))
    .catch(err => console.error(err))

    console.log("RES Data:-",responseData)*/
  };

  const handleUpload = (e) => {
    
    //--------------AWS S3------------------
    // console.log("-----: AWS :-----", e.target.files)
    /*const responseData = uploadFile(e.target.files[0], config)
    .then(data => console.log(data))
    .catch(err => console.error(err))

    console.log("RES Data:-",responseData)*/

    //--------------------------------
    /*
    let formData = new FormData();
    formData.append('imageData', imageData['file']);
    formData.append('name', 'Vedant');
    let imData = imageData;*/
    try {
      // console.log("FILE*:-----",imData)
      console.log("formData:-----",formData)
      // const response = await axios.post('http://localhost:5000/api/upload', {"data":imData['name']}).then((res) => {
      //   console.log("RESULT:-",res);
      // });
      // console.log(response);
    } catch (error) {
      console.error('Failed to upload:', error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Profile Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ProfileUpload;
