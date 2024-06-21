import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { decode } from 'punycode';
 
export const createJWT = (payload) => {
  return jwt.sign(payload,process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
 
}
export const verifyJWT = (token) => {
    return jwt.verify(token,process.env.JWT_SECRET);
}