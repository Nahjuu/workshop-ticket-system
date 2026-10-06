import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name
      FROM branch_members
      WHERE active = TRUE
      ORDER BY name
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener los empleados",
    });
  }
});

export default router;