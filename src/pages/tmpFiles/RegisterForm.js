// RegisterForm.js
import { useState } from 'react';
import axios from 'axios';

var cors = require('cors')
// app.use(cors())


const RegisterForm = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState('');
  

  const sendDataToServer = async (e) => {
  e.preventDefault();
  try {
    // Make an HTTP POST request to your server endpoint
    setData({"name":name,"email":email,"password":password});
    const response = await axios.post("http://127.0.0.1:5000/api/register", data);
    console.log("response.:----",data);
    // Handle the response from the server
    console.log(response); // You can customize this based on your server's response
  } catch (error) {
    console.error(error);
  }
}/*
  const handleSubmit = async (e) => {
    e.preventDefault();

  };*/

  return (
    <form onSubmit={sendDataToServer}>
      <input type="text" value={formData.name} placeholder="Name" />
      <input type="email" value={formData.email} placeholder="Email" />
      <input type="password" value={formData.password} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
