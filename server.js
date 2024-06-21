import 'express-async-errors';
import express from 'express';
const app = express()
import morgan from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config();
import jobRouter from './routes/jobRouter.js';
import mongoose from 'mongoose';
import authRouter from './routes/authRouter.js';
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
import { authenticateUser } from './middleware/authMiddleware.js';
app.use(express.json());
import cookieParser from 'cookie-parser';
app.use(cookieParser());
app.get('/',(req,res) => {
    res.send('Hello World');
})

app.use('/api/jobs', authenticateUser,jobRouter);
app.use('/api/auth', authRouter);

//trggers when nothing match in the server
app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' });
});

//triggered when request is valid but there is some param error
//or when there is typo in the exisiting route
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ msg: 'something went wrong' });
});
const port = process.env.PORT || 5051;

try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server running on PORT ${port}....`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
