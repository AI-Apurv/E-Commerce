import { Schema, model, Document } from 'mongoose';


// User schema
interface User extends Document {
  user_name : string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>({

  user_name : {
    type : String ,
    required : true ,
    unique : true
  },

  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});

const User =  model<User>('users', userSchema);
export default User;