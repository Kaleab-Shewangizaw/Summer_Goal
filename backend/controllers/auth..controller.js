import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getProfile = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "JWT must be provided!" });
  }
  jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
    if (err) throw err;
    return res.json({
      success: true,
      userData: info,
    });
  });
};

export const getProfileWithId = async (req, res) => {
  const { id } = req.params;
  const _id = id;
  try {
    const user = await User.findOne({ _id });
    if (!user) {
      return res.json({ success: false, message: "404 User not Found" });
    }
    const { password, ...otherInfo } = user._doc;
    return res.status(200).json({ success: true, userInfo: otherInfo });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: err });
  }
};

export function signup(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long",
    });
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      }
      const newUser = new User({
        username,
        email,
        password: hash,
      });
      newUser
        .save()
        .then(() => {
          res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser,
          });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ success: false, message: "Server error", error: err });
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: "Server error", error: err });
    });
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "incorrect credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
        ProfilePic: user.ProfilePic,
        bio: user.bio,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Login successful",
        user,
      });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
}

export async function logout(req, res) {
  res.cookie("token", "").status(200).json({ status: true });
}

export async function deleteAccount(req, res) {
  const { email } = req.body;
  try {
    await User.findOneAndDelete({ email });
    return res
      .cookie("token", "")
      .status(200)
      .json({ success: true, message: "Account deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: err });
  }
}

export async function updateAccount(req, res) {
  const { username, email, password, bio, ProfilePic } = req.body;
  const id = req.params.id;

  try {
    const updatedFields = {
      username,
      email,
      bio,
      ProfilePic,
    };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updatedFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Account updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
}
