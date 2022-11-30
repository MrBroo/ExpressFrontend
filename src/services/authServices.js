import { message } from "antd";
import { instance } from "../utils/axios";
import { getErrorMessage } from "../utils/utils";
const jwtToken = localStorage.getItem("token");

export const SIGN_UP = async (user) => {
  try {
    const { data } = await instance.post("/auth/registration", user);
    return data;
  } catch (error) {
    console.log(error);
    message.error(getErrorMessage(error));
  }
};

export const SIGN_IN = async (user) => {
  try {
    const { data } = await instance.post("/auth/login", {
      user,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    message.error(getErrorMessage(error));
  }
};

export const FETCH_USER = async () => {
  try {
    const data = await instance.get("auth/users");
    return data;
  } catch (error) {
    console.log(error);
    message.error(getErrorMessage(error));
  }
};

export const DELETE_USER = async (id) => {
  try {
    const data = await instance.delete(`auth/users/delete/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    message.error(getErrorMessage(error));
  }
};

export const UNBLOCK_USER = async (id) => {
  try {
    const data = await instance.put(`auth/users/unblock/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    message.error(getErrorMessage(error));
  }
};

export const BLOCK_USER = async (id) => {
  try {
    const data = await instance.put(`auth/users/block/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    message.error(getErrorMessage(error));
  }
};
