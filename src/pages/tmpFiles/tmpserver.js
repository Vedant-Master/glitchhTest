// server.js

const express = require('express');
const mongoose = require('mongoose');
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

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'for-test-development',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, `uploads/${Date.now().toString()}-${file.originalname}`);
    },
  }),
});


// Connect to MongoDB
mongoose
  .connect('mongodb+srv://vedant:MasterCodder5@cluster0.jxczk1p.mongodb.net/userDetails', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Define the user schema and model
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const user = mongoose.model('user', userSchema);

// Create API endpoints for register and login
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new user({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'user registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }

  /*try {
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("User already register");
        }
 
    } catch (e) {
        resp.send("Something Went Wrong");
    }*/
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("USERDETAILS:-",user.find())
  try {
    console.log("USERDETAILS:-",user.find())
    const user = await user.findOne({ email });
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Uploading file on AWS
app.post('/api/upload', upload.single('file'), (req, res) => {
  console.log("***** In the AWS Upload *****")
  res.json({ message: 'File uploaded successfully' });
});


// Signing AWS
app.get('/api/sign-url', (req, res) => {
  const params = {
    Bucket: 'for-test-development',
    Key: '/user@solvios.com/1.jpg', // Provide the file key you want to generate a signed URL for
    Expires: 3600, // Expiration time in seconds (1 hour)
  };

  s3.getSignedUrl('getObject', params, (err, url) => {
    if (err) {
      console.error('Failed to generate signed URL:', err);
      res.status(500).json({ error: 'Failed to generate signed URL' });
    } else {
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


