import { Router } from "express";
import {
  addHomework,
  getTeacher,
  getTeacherGroups,
} from "../controllers/teacher.controller.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const teacherRouter = Router();

export default teacherRouter
  .get(
    "/teacher",
    [verifyToken, verifyRole("teacher")],
    verifyToken,
    getTeacher
  )
  .get(
    "/teacher/groups/:id",
    [verifyToken, verifyRole("teacher")],
    verifyToken,
    getTeacherGroups
  )
.post('/teacher/homework/:id', addHomework)