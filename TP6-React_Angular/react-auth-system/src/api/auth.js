/* eslint-disable no-unused-vars */
import axios from "axios";
import CryptoJS from "crypto-js";

export const login = async (username, password) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/users?username=${username}`
    );
    const user = response.data[0];
    const hashedPassword = CryptoJS.SHA256(password).toString();

    if (!user || user.password !== hashedPassword) {
      throw new Error("Invalid credentials");
    }
    return user;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const signup = async (username, password) => {
  try {
    const checkUser = await axios.get(
      `http://localhost:3001/users?username=${username}`
    );
    if (checkUser.data.length > 0) {
      throw new Error("Username already exists");
    }

    const hashedPassword = CryptoJS.SHA256(password).toString();
    await axios.post("http://localhost:3001/users", {
      username,
      password: hashedPassword,
    });
  } catch (error) {
    throw new Error("Signup failed");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
