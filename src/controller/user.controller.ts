import User from "../models/user.model";
import { Request,Response } from "express";
import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
import { responseMessages } from "../utils/responseMessages";

dotenv.config();


//------------------------------------------------------signup------------------------------------------------------------------------------------------

export const signup = async (req: Request, res:Response) => {
    try {
      const { user_name,first_name, last_name, email, password } = req.body;
    
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      

      // Create a new user
      const newUser = await User.create({
        user_name,
        first_name,
        last_name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: responseMessages.userCreated, user: newUser });
    } catch (error) {
      res.status(500).json({ message: responseMessages.errorCreatingUser})
  }
};



//--------------------------------------------------login----------------------------------------------------------------------------

export const login = async (req: Request , res: Response) => {
    try{
        const {email , password} = req.body;
        const user = await User.findOne({email})
        if(!user)
        {
            return res.status(401).send(responseMessages.invalidEmail)
        }

        const passwordMatch = await bcrypt.compare(password , user.password)
        if(!passwordMatch)
        {
            return res.status(401).json({message:responseMessages.invalidPassword})
        }
        else
        {
            const token = jwt.sign({email:user.email},process.env.SECRET_KEY as Secret)
            res.send(token);
        }
        

    }
    catch(error)
    {
        res.status(500).json({message: responseMessages.invalidCredentials});
    }
}