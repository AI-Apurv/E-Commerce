import express from 'express'
import * as dotenv from 'dotenv'
import { dbConnection } from './src/core/connection';
import router from './src/routes/user.routes';
import { responseMessages } from './src/utils/responseMessages';

const app = express();
app.use(express.json());

dotenv.config();
const port = process.env.PORT;

dbConnection();

app.get('/',(req,res)=>{
    res.send(responseMessages.welcomeMessage);
});

app.use('/api',router);



app.listen(port,()=>{
    console.log(`Server is listening at http://localhost:${port}`);
})