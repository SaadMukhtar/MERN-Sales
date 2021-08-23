import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @acccess Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const match = await user.matchPassword(password);

  if (user && match) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error(`Invalid email or password`);
  }
});

// @desc    Get User Profile
// @route   GET /api/users/profile
// @acccess Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = User.findById(req.user._id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export { authUser, getUserProfile };
