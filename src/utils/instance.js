import axios from "axios";
import { SERVER_URL } from "../config";

const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000000, // Optional: Set a timeout
});

export default instance;
