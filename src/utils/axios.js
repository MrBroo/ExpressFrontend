import axios from "axios";
console.log("token");
export const instance = axios.create({
  baseURL: "https://abroranvarovtask4.herokuapp.com/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
