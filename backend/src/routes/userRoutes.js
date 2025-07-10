import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import {
  acceptFriendRequest,
  getFriendRequests,
  getMyFriends,
  getOutgoingFriendRequests,
  getRecommendedUsers,
  sendFriendRequest,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", protectRoute, getRecommendedUsers);

router.get("/friends", protectRoute, getMyFriends);

router.post("/friend-request/:id", protectRoute, sendFriendRequest);
router.put("/friend-request/:id/accept", protectRoute, acceptFriendRequest);

router.get("/friend-requests", protectRoute, getFriendRequests);
router.get("/outgoing-friend-requests", protectRoute, getOutgoingFriendRequests);

export default router;
