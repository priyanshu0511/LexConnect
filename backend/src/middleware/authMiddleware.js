import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    // const token = req.cookies.jwt;
    // if (!token) {
    //   return res
    //     .status(401)
    //     .json({ message: "Unauthorized - No Token Provided." });
    // }
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided in Header" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware :", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};
