import express from "express";
import pool from "./db.js";
import locationsRouter from "./routes/locations.js";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = 3000;

app.use(express.json());

app.use("/api/locations", locationsRouter);

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