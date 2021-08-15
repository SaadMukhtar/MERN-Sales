import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

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
      token: null,
    });
  } else {
    res.status(401);
    throw new Error(
      `Invalid email or password; \nuser: ${user} \nmatch:${match}`
    );
  }
});

export { authUser };
