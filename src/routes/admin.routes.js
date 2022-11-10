import { Router } from "express";
import { addCourse, createGroup, createStudent, createTeacher, deleteCourse, deleteGroup, deleteStudent, deleteTeacher, getAdmin, getAdminCourse, getAdminGroup, getAdminStudent, getAdminTeacher } from "../controllers/admin.controller.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const adminRouter = Router()

export default adminRouter
.get('/admin', [verifyToken, verifyRole('admin')], getAdmin)
.get('/admin/group', [verifyToken, verifyRole('admin')], getAdminGroup)
.get('/admin/teacher', [verifyToken, verifyRole('admin')], getAdminTeacher)
.get('/admin/course', [verifyToken, verifyRole('admin')], getAdminCourse)
.get('/admin/student', [verifyToken, verifyRole('admin')], getAdminStudent)
.post('/admin/course/add', addCourse)
.post('/admin/group/add', createGroup)
.post('/admin/teacher/add', createTeacher)
.post('/admin/student/add', createStudent)
.delete('/admin/course/:id', deleteCourse)
.delete('/admin/group/:id', deleteGroup)
.delete('/admin/teacher/:id', deleteTeacher)
.delete('/admin/student/:id', deleteStudent)