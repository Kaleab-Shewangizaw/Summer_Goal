import mongoose, { model } from "mongoose";

const user = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    profilePic: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
    },
    plans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
      },
    ],
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    badges: [
      {
        name: String,
        description: String,
        icon: String,
        earnedAt: Date,
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        author: {
          type: String,
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

const User = model("User", user);

export default User;
