import { body,param, validationResult } from 'express-validator';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import User from '../models/UserModel.js';
const withValidationErrors = (validateValues) => {
    return [
      validateValues,
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const errorMessages = errors.array().map((error) => error.msg);
          return res.status(400).json({ errors: errorMessages });
        }
        next();
      },
    ];
  };

export const validateJobInput = withValidationErrors([
    body('company').notEmpty().withMessage('company is required'),
    body('position').notEmpty().withMessage('position is required'),
    body('jobLocation').notEmpty().withMessage('job location is required'),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('invalid status value'),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid job type'),
]);

export const validateIdParam = withValidationErrors([
    param('id').custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage('invalid MongoDB id'),
]);

export const validateRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('Name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async(email)=>{
        const user = await User.findOne({email})
        if(user){
            console.log('working');
            const error = new Error('Email already exists');
            error.status = 400;
            throw error;
            console.log('Not working');
        }
        console.log('Not working');
    }),
    body('password').notEmpty().withMessage('Password is required').isLength({min:8}).withMessage('Password must be atleast 8 characters long '),
    body('location').notEmpty().withMessage('Location is required'),
]);

export const validateLoginInput = withValidationErrors([
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('invalid email format'),
    body('password').notEmpty().withMessage('password is required'),
]);