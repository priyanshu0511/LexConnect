import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, //Allows frontend to send cookies
  })
);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
  connectDB();
});
