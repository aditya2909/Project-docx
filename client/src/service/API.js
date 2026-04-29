import axios from "axios";

const API = axios.create({
  baseURL: "https://project-docx.onrender.com/api/", // change if needed
});

export default API;
