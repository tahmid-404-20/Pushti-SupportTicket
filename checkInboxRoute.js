const supabase = require("./db.js");
const router = require("express").Router();

// send {id: user_id}
router.post("/", async (req, res) => {
  try {
    let response = await supabase.any(
      `select "subject", "details", "time", "status"
        from "SupportTicket"
        where "userId" = $1
        order by "time" desc;`,
      [req.body.id]
    );

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;