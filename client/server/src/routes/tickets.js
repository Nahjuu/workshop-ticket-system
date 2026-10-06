import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        ticket_number,
        customer_name,
        customer_phone,
        customer_email,
        product_name,
        issue_description,
        budget,
        repair_status,
        repair_comment,
        status,
        branch_id,
        created_by_member_id,
        created_at,
        updated_at
      FROM tickets
      ORDER BY created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener los tickets",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        id,
        ticket_number,
        customer_name,
        customer_phone,
        customer_email,
        product_name,
        issue_description,
        budget,
        repair_status,
        repair_comment,
        status,
        branch_id,
        created_by_member_id,
        created_at,
        updated_at
      FROM tickets
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Ticket no encontrado",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener el ticket",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      productName,
      budget,
      issueDescription,
      branchId,
      memberId,
    } = req.body;

    const ticketNumber = `T-${Date.now()}`;

    const result = await pool.query(
      `
      INSERT INTO tickets (
        ticket_number,
        customer_name,
        customer_phone,
        customer_email,
        product_name,
        issue_description,
        budget,
        branch_id,
        created_by_member_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
      `,
      [
  ticketNumber,
  customerName,
  customerPhone || null,
  customerEmail || null,
  productName,
  issueDescription,
  budget,
  branchId,
  memberId,
]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al crear el ticket",
    });
  }
});



export default router;