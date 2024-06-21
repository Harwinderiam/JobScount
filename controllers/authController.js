import { StatusCodes } from "http-status-codes";
import User from '../models/UserModel.js'
import bcrypt from 'bcryptjs';
import { hashPassword,comparePassword } from "../utils/passwordUtils.js";
import {createJWT} from '../utils/tokenUtils.js'
import dotenv from 'dotenv';


export const register = async (req, res) => {
    const isFirstAccount = await User.countDocuments() === 0;
    req.body.role = isFirstAccount?'admin':'user';

    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({msg: 'User Created'});
};


export const login = async (req, res) => {

    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(401).json({ msg: 'Invalid Credentials' });
    }
    const isPasswordCorrect = await comparePassword(req.body.password,user.password);
    if(!isPasswordCorrect){
        return res.status(401).json({ msg: 'Invalid Credentials' });
    }
    console.log(process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);

    const token = createJWT({userID:user._id, role:user.role} );
    const oneDay = 1000 * 60 * 60 * 24; //!day in milli seconds
    res.cookie('token',token,{httpOnly:true,expires:new Date(Date.now()+oneDay),secure: process.env.NODE_ENV === 'production',});
    res.status(StatusCodes.OK).json({msg:'User logged in!!'})

};