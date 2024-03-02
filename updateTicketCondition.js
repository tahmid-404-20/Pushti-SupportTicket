const supabase = require("./db.js");
const router = require("express").Router();

// make-read is used to close the ticket
router.post("/make-read", async (req, res) => {
  try {
    let { ticketId, comment } = req.body;
    let response = await supabase.one(
      `update "SupportTicket" set "readStatus" = True, "adminComment" = $1 where "id" = $2 returning *;`,
      [comment, ticketId]
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/update-status", async (req, res) => {
  try {
    let { ticketId, status } = req.body;
    let response = await supabase.one(
      `update "SupportTicket" set "status" = $1 where "id" = $2 returning *;`,
      [status, ticketId]
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
