const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const axios = require("axios");
const PORT = process.env.port;
const supabase = require("./db.js");

// hfor admin
const historyRoute = require("./historyRoute.js");
const updateTicketCondition = require("./updateTicketCondition.js");
// for vendor, farmer, sme and agent
const sendTicketRoute = require("./sendTicketRoute.js");
const checkInboxRoute = require("./checkInboxRoute.js");

app.use(express.json());
app.use(cors({ origin: "*" }));


app.use("/get-tickets", historyRoute);
app.use("/update-ticket", updateTicketCondition);

// caution - use appropiate userType with id
app.use("/send-ticket", sendTicketRoute);
app.use("/inbox", checkInboxRoute);

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);

  try {
    let serviceRegisterUrl =
      String(process.env.serviceRegistryUrl) + "/register";

    await axios.post(serviceRegisterUrl, {
      name: process.env.selfName,
      url: process.env.selfUrl,
    });
    console.log("Service registered successfully");
  } catch (error) {
    console.error("Failed to register service:", error);
    process.exit(1);
  }
});

const deregisterService = async () => {
  try {
    let serviceRegisterUrl =
      String(process.env.serviceRegistryUrl) + "/deregister";
    await axios.post(serviceRegisterUrl, { name: process.env.selfName });
    console.log("Service de-registered successfully");
  } catch (error) {
    console.log("Failed to de-register service:", error);
    process.exit(1);
  }
};

const gracefulShutdown = async () => {
  await deregisterService();
  process.exit(0);
};

process.on("SIGTERM", gracefulShutdown); // For termination signal
process.on("SIGINT", gracefulShutdown); // For interrupt signal
process.on("uncaughtException", gracefulShutdown); // For uncaught exceptions
