import axios from "axios";
import cookie from "js-cookie";

export const request = axios.create({
  baseURL: "https://admin-crm.onrender.com",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${cookie.get("jwt")}`,
  },
});
