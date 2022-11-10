import { errorHandlerError } from "../errors/error.handler.errors.js";

export const loginCheckerToken = (req, res, next) => {
  const { token } = req.cookies;

  if(token){
    return next(new errorHandlerError('Already logged in', 401))
  }

  next()
}