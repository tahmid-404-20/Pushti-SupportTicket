const supabase = require("./db.js");
const router = require("express").Router();

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
