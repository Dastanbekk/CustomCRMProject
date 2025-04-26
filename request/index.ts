import axios from "axios";
import cookie from "js-cookie";

const token = cookie.get("jwt");

const headers = token ? { Authorization: `Bearer ${token}` } : {};

export const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers,
  withCredentials: true,
});
