import { Router } from "express";
import {
  getStudent,
  studentHomework,
} from "../controllers/student.controller.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const studentRouter = Router();

export default studentRouter
  .get(
    "/student",
    [verifyToken, verifyRole("student")],
    verifyToken,
    getStudent
  )
  .post("/student/homework/:id", studentHomework);