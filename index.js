import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB  from './config/db.js'
import userRouter from './routes/user.js';
import authRoute from './routes/auth.js'
import productRoute from './routes/product.js'
const PORT = 200 || process.env.PORT;
const app = express();

// Connect To database
connectDB()

// Body Parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))




app.use('/api/auth', authRoute);
app.use('/api/user', userRouter);
app.use('/api/products', productRoute);




// Listen to five PORT
app.listen(PORT,()=>{
    console.log('Server is Running on : ', `${PORT}`);
})