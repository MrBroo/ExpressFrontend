import axios from "axios";
const jwtToken = localStorage.getItem("token");

export const instance = axios.create({
  baseURL: "https://abroranvarovtask4.herokuapp.com/",
  headers: {
    Authorization: `Bearer ${jwtToken}`,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
