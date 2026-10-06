import express from "express";
import pool from "./db.js";
import cors from "cors";
import locationsRouter from "./routes/locations.js";
import ticketsRouter from "./routes/tickets.js";
import branchMembersRouter from "./routes/branchMembers.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/branch-members", branchMembersRouter);
app.use("/api/locations", locationsRouter);
app.use("/api/tickets", ticketsRouter);

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Database connection error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});