import mongoose from "mongoose";

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
  comments: [
    {
      // here I need unique id for each comment and automatically generated
      // by mongoose
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
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
