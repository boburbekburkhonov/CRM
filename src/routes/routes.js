import { Router } from "express";
import adminRoutes from "./admin.routes.js";
import loginRoutes from "./login.routes.js";
import studentRoutes from "./student.routes.js";
import teacherRoutes from "./teacher.routes.js";

const routes = Router()

export default routes.use([loginRoutes, adminRoutes, teacherRoutes, studentRoutes])
