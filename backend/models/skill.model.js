import mongoose from "mongoose";

const SkillCommentSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

const SkillSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  comment: [SkillCommentSchema],
  isAccomplished: {
    type: Boolean,
    default: false,
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  dateOfAccomplishement: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Skill = mongoose.model("Skill", SkillSchema);

export default Skill;
