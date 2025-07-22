import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export const getRecommendedUsers = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const currentUser = await User.findById(currentUserId);

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, // ne= not equal, So don't include user
        { _id: { $nin: currentUser.friends } }, // nin= not in, So don't include user's friends
        { isOnBoarded: true },
      ],
    });
    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.log("Error in getRecommendedUsers controller :", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMyFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage location bio"
      );

    res.status(200).json(user.friends);
  } catch (error) {
    console.log("Error in getMyFriends controller :", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { id: receiverId } = req.params;

    //Prevent sending friend request to ourselves
    if (senderId === receiverId) {
      return res
        .status(400)
        .json({ message: "You can't send friend request to yourself" });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(400).json({ message: "Recipient not found." });
    }

    //Check if user is already friends
    if (receiver.friends.includes(senderId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });
    if (existingRequest) {
      return res.status(400).json({
        message: "A friend request already exists between you and this user",
      });
    }

    const friendRequest = await FriendRequest.create({
      sender: senderId,
      receiver: receiverId,
    });

    res.status(201).json(friendRequest);
  } catch (error) {
    console.log("Error in sendFriendRequest controller :", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Request ID not found" });
    }

    if (friendRequest.receiver.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to accept this request" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // Add each other to other's friend array -
    await User.findByIdAndUpdate(friendRequest.receiver, {
      $addToSet: { friends: friendRequest.sender },
    });
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.receiver },
    });

    res.status(200).json({ message: "Friend Request Accepted" });
  } catch (error) {
    console.log("Error in acceptFriendRequest controller :", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
    const incomingRequests = await FriendRequest.find({
      receiver: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    const acceptedRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("receiver", "fullName profilePic");

    res.status(200).json({ incomingRequests, acceptedRequests });
  } catch (error) {
    console.log("Error in getFriendRequests controller :", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOutgoingFriendRequests = async (req, res) => {
  try {
    const outgoingRequest = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "receiver",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    res.status(200).json(outgoingRequest);
  } catch (error) {
    console.log("Error in getOutgoingFriendRequests controller :", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
