import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:44314/api/",
});

export default service;
