import express from "express";
import { add, deleteID, getId, getList, update } from "../controllers/student.js";
import { CheckPermission } from "../middleware/checkPermission.js";

const student = express.Router();

student.get("/students",CheckPermission, getList);
student.get("/students/:id", getId);
student.post("/students", add);
student.put("/students/:id", update);
student.delete("/students/:id", deleteID);

export default student;
