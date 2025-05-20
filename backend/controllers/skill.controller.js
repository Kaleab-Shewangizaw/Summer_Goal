import Skill from "../models/skill.model.js";
import User from "../models/user.model.js";

export const createSkill = async (req, res) => {
  const { id } = req.params;
  const { title, description, isAccomplished, pinned } = req.body;

  try {
    const newSkill = await Skill.create({
      title,
      description,
      isAccomplished,
      pinned,
    });
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    await User.findByIdAndUpdate(
      id,
      {
        $push: { skills: newSkill._id },
      },
      { new: true }
    );
    return res.status(200).json({ success: true, skill: newSkill });
  } catch (err) {
    return rs
      .status(500)
      .json({ success: false, message: "faild to create plan" });
  }
};

export const getAllSkills = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("skills");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    return res.status(200).json({ success: true, skills: user.skills });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

export const getSkillById = async (req, res) => {
  const { id } = req.params;
  try {
    const skill = await Skill.findById(id);
    if (!skill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });
    }
    return res.status(200).json({ success: true, skill: skill });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

export const updateSkill = async (req, res) => {
  const { title, description, pinned, isAccomplished, dateOfAccomplishement } =
    req.body;
  const { id } = req.params;
  try {
    const skill = await Skill.findByIdAndUpdate(
      id,
      {
        title,
        description,
        pinned,
        isAccomplished,
        dateOfAccomplishement,
      },
      { new: true }
    );
    return res.status(200).json({ success: true, skill });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "failed to update skill" });
  }
};

export const addComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const skill = await Skill.findByIdAndUpdate(
      id,
      {
        $push: { comment: { text } },
      },
      { new: true }
    );
    return res.status(200).json({ success: true, skill });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "failed to add comment" });
  }
};

export const deleteComment = async (req, res) => {
  const { id, commentId } = req.params;
  try {
    const skill = await Skill.findByIdAndUpdate(
      id,
      {
        $pull: { comment: { _id: commentId } },
      },
      { new: true }
    );
    return res.status(200).json({ success: true, skill });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "failed to delete comment" });
  }
};

export const deleteSkill = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSkill = await Skill.findByIdAndDelete(id);
    if (!deletedSkill) {
      return res
        .status(404)
        .json({ success: false, message: "skill not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "skill deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "failed to delete skill" });
  }
};
