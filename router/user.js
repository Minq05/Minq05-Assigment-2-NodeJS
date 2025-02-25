import express from "express";
import { Login, Register } from "../controllers/user.js";

const user = express.Router();

user.post("/register", Register);
user.post("/login", Login);

export default user;
