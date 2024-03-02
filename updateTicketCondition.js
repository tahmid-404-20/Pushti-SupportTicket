const supabase = require("./db.js");
const router = require("express").Router();

// make-read is used to close the ticket
router.post("/make-read", async (req, res) => {
  try {
    let { ticketId } = req.body;
    let response = await supabase.one(
      `update "SupportTicket" set "readStatus" = True where "id" = $1 returning *;`,
      [ticketId]
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/update-status", async (req, res) => {
  try {
    let { ticketId, status, comment } = req.body;
    let response = await supabase.one(
      `update "SupportTicket" set "status" = $1, "adminComment" = $2 where "id" = $3 returning *;`,
      [status, comment, ticketId]
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
