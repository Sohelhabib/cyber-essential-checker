import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import assessRoutes from "./routes/assess.js";
import stripeRoutes from "./routes/stripe.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/assess", assessRoutes);
app.use("/api/stripe", stripeRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(4000, () => console.log("Server running on port 4000"));
  })
  .catch((err) => console.error("MongoDB error:", err));