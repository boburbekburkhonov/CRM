import { sign } from "../utils/jwt.js";
import { errorHandlerError } from "../errors/error.handler.errors.js";
import { read } from "../utils/FS.js";

export const getLogin = (req, res) => {
  res.render('login.ejs')
}

// LOGIN CHECKER

export const loginChecker = (req, res, next) => {
  const { name, password } = req.filtered;

  const allUsers = read('users.json')

  const foundUser = allUsers.find(e => e.name.toLowerCase() == name.toLowerCase() && e.password == password)

  if(!foundUser){
    return next(new errorHandlerError('User not found', 404))
  }

  if(foundUser.role == 'admin'){
    res.cookie('token', sign({id: foundUser?.id, role: foundUser?.role, name:foundUser?.name}))

    res.redirect('/admin')
     return
  }

  if(foundUser.role == 'teacher'){
    res.cookie('token', sign({id: foundUser?.id, role: foundUser?.role, name:foundUser?.name}))

    res.redirect('/teacher')
    return
  }

  if(foundUser.role == 'student'){
    res.cookie('token', sign({id: foundUser?.id, role: foundUser?.role, name:foundUser?.name}))

    res.redirect('/student')
    return
  }

}