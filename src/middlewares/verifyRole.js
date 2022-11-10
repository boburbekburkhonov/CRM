import { errorHandlerError } from "../errors/error.handler.errors.js";

export const verifyRole = (userRole) => {
  return (req, res, next) => {
    const { role } = req;

    if(userRole != role){
      return next(new errorHandlerError("Sizga bu yerda dostup yo'q!", 401))
    }

    next()
  }
}