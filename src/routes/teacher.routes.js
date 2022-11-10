import { Router } from "express";
import { getTeacher } from "../controllers/teacher.controller.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const teacherRouter = Router()

export default teacherRouter.get('/teacher', [verifyToken, verifyRole('teacher')], verifyToken, getTeacher)