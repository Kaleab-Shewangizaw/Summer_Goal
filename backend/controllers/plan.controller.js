import mongoose from "mongoose";
import Plan from "../models/plan.model.js";
import User from "../models/user.model.js";

export const createPlan = async (req, res) => {
  const { title, description, target, pinned } = req.body;
  const userId = req.params.id;
  try {
    const newPlan = await Plan.create({
      title,
      description,
      target,
      pinned,
    });

    await User.findByIdAndUpdate(
      userId,
      { $push: { plans: newPlan._id } },
      { new: true }
    );

    return res.status(201).json({ success: true, plan: newPlan });
  } catch (error) {
    console.error("Error creating plan:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create plan" });
  }
};

export const getAllPlans = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate("plans");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, plans: user.plans });
  } catch (error) {
    console.error("Error fetching plans:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch plans" });
  }
};

export const getPlanById = async (req, res) => {
  const { planId } = req.params;
  try {
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }
    return res.status(200).json({ success: true, plan });
  } catch (error) {
    console.error("Error fetching plan:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch plan" });
  }
};
export const addComment = async (req, res) => {
  const { planId } = req.params;
  const { text } = req.body;
  try {
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }
    plan.comments.push({ text: text });
    await plan.save();
    return res.status(200).json({ success: true, plan });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to add comment" });
  }
};

export const markPlanAsDone = async (req, res) => {
  const { id } = req.params;
  const today = new Date().toISOString().split("T")[0];

  try {
    const plan = await Plan.findById(id);
    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }

    const todayLog = plan.dailyLog.find((log) => log.date === today);

    if (todayLog) {
      todayLog.count += 1;
    } else {
      plan.dailyLog.push({ date: today, count: 1 });
    }

    plan.progress += 1;

    await plan.save();

    res.status(200).json({ success: true, message: "Marked as done", plan });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const markPlanUnDone = async (req, res) => {
  const { id } = req.params;

  try {
    const plan = await Plan.findById(id);
    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }

    const lastLog = plan.dailyLog[plan.dailyLog.length - 1];

    if (lastLog) {
      if (lastLog.count > 0) {
        lastLog.count -= 1;
      }
      if (lastLog.count <= 0) {
        plan.dailyLog = plan.dailyLog.filter(
          (log) => log.date !== lastLog.date
        );
      }
    }
    if (plan.progress > 0) {
      plan.progress -= 1;
    }

    await plan.save();

    res.status(200).json({ success: true, message: "Marked as undone", plan });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const deleteComment = async (req, res) => {
  const { planId, commentId } = req.params;
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(
      planId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );
    if (!updatedPlan) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }
    return res.status(200).json({ success: true, plan: updatedPlan });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete comment" });
  }
};

export const updatePlan = async (req, res) => {
  const { planId } = req.params;
  const { title, description, target, pinned } = req.body;
  if (!title || !target) {
    return res
      .status(400)
      .json({ success: false, message: "Title and target are required" });
  }
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(
      planId,
      { title, description, target, pinned },
      { new: true }
    );
    if (!updatedPlan) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }
    return res.status(200).json({ success: true, plan: updatedPlan });
  } catch (error) {
    console.error("Error updating plan:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update plan" });
  }
};
export const deletePlan = async (req, res) => {
  const { planId } = req.params;
  try {
    const deletedPlan = await Plan.findByIdAndDelete(planId);
    if (!deletedPlan) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }
    await User.updateMany({ plans: planId }, { $pull: { plans: planId } });
    return res.status(200).json({ success: true, message: "Plan deleted" });
  } catch (error) {
    console.error("Error deleting plan:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete plan" });
  }
};
