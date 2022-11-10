import jwt from 'jsonwebtoken'
import { errorHandlerError } from '../errors/error.handler.errors.js';

export const verifyToken = (req, res, next) => {
  const { token } = req.cookies;

  if(!token){
    return next(new errorHandlerError('Provide access token', 401))
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
    if(err instanceof jwt.JsonWebTokenError){
      return next(new errorHandlerError('Invalid token', 401))
    }

    req.id = decode.id;
    req.name = decode.name;
    req.role = decode.role;

    next()
  })
}