const supabase = require("./db.js");
const router = require("express").Router();

// caution - use appropiate userType with id
router.post("/", async (req, res) => {
  try {
    let { subject, details, userId, userType } = req.body;
    console.log(subject, details, userId, userType);
    let response = await supabase.one(
      `insert into "SupportTicket" ("subject", "details", "userId", "userType") values ($1, $2, $3, $4) returning *;`,
      [subject, details, userId, userType]
    );
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
