import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true } // this makes sure _id is generated
);

const planSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  target: {
    type: Number,
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  comments: [commentSchema],

  dailyLog: [
    {
      date: String,
      count: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Plan = mongoose.model("Plan", planSchema);
export default Plan;
