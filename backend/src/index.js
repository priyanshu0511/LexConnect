import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'
import { connectDB } from '../lib/db.js';

const app = express();

dotenv.config();
const PORT= process.env.PORT;

app.use(express.json());

app.use('/api/auth',authRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`)
    connectDB();
})