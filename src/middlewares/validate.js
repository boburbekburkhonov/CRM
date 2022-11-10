import { errorHandlerError } from "../errors/error.handler.errors.js"

export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body)

    if(error){
      return next(new errorHandlerError(error.message, 400))
    }

    req.filtered = value

    next()
  }
}