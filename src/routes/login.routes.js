import { Router } from "express";
import { getLogin, loginChecker } from "../controllers/login.controller.js";
import { loginCheckerToken } from "../middlewares/login.checker.js";
import { validate } from "../middlewares/validate.js";
import { validationLogin } from "../validation/validation.login.js";

const loginRouter = Router()

export default loginRouter
.get('/', loginCheckerToken, getLogin)
.post('/login/checker', validate(validationLogin), loginChecker)