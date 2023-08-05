import { Schema, model, Document, ObjectId } from "mongoose";
import { boolean } from "joi";

//model Schema 
interface Session extends Document {
    isActive: boolean;
    user_id : ObjectId;
}

const sessionSchema = new Schema<Session>({
     user_id: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
     },
     isActive: {
        type: Boolean,
        required: true
     }
})