import axios from 'axios';

export default axios.create({
  baseURL: 'https://technotes-api.onrender.com',
  headers: {
    'Content-type': 'application/json'
  }
});