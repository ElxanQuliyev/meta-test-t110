import axios from "axios";
import { BASE_URL } from "./baseConfig";
export const getCSRFToken = async () => {
    const response = await axios.get(`${BASE_URL}/api/getCSRFToken`);
    axios.defaults.headers.post["X-CSRF-Token"] = response.data.CSRFToken
 }; 