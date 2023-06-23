// server.js

const express = require('express');
// const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');

const cors = require('cors');

app.use(express.json());
app.use(cors())

// AWS Connect
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const s3 = new AWS.S3({
  accessKeyId: "AKIARVAS5GDK4ULCBAVV",
  secretAccessKey: "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",
});


// Signing AWS
app.post('/api/sign-url', (req, res) => {
  
  const params = {
    Bucket: 'for-test-development',
    Key: '/1.jpg', // Provide the file key you want to generate a signed URL for
    Expires: 3600, // Expiration time in seconds (1 hour)
  };

  s3.getSignedUrl('getObject', params, (err, url) => {
    if (err) {
      console.error('Failed to generate signed URL:', err);
      res.status(500).json({ error: 'Failed to generate signed URL' });
    } else {
      // console.log("@@@@@:-",req);
      res.json({ url });
    }
  });
});

// Media List
app.get('/api/media', (req, res) => {
  const params = {
    Bucket: 'for-test-development',
    Prefix: '',
  };

  s3.listObjectsV2(params, (err, data) => {
    console.log("DATA:-",data);
    if (err) {
      console.error('Failed to fetch media:', err);
      res.status(500).json({ error: 'Failed to fetch media' });
    } else {
      const mediaFiles = data.Contents.map((file) => ({
        key: file.Key,
        url: `https://for-test-development.s3.amazonaws.com/${file.Key}`,
      }));
      res.json({ mediaFiles });
    }
  });
});

// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});


