import mongoose from "mongoose";

const AssessmentSchema = new mongoose.Schema({
  email: { type: String, required: true },
  companyName: String,
  answers: { type: Map, of: String },
  score: Number,
  readiness: String,
  gaps: Array,
  controlBreakdown: Array,
  isPaid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Assessment", AssessmentSchema);