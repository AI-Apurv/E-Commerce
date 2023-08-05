import express from 'express'
import { signup,login } from "../controller/user.controller";
import { signupMiddleware } from '../middleware/joiValidation';

const router = express.Router();


router.post('/signup',signupMiddleware,signup);
router.post('/login',login)


export default router ;

