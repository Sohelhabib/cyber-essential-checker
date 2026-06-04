import express from "express";
import Assessment from "../models/Assessment.js";
import { scoreAssessment } from "../utils/scorer.js";
import { questions } from "../../client/src/data/questions.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, companyName, answers } = req.body;
    const { overallScore, controlBreakdown, gaps, readiness } =
      scoreAssessment(answers, questions);

    const assessment = new Assessment({
      email,
      companyName,
      answers,
      score: overallScore,
      readiness,
      gaps,
      controlBreakdown,
    });

    await assessment.save();
    res.json({ overallScore, controlBreakdown, gaps, readiness, id: assessment._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;