const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const SCOPE = "marketplace";

/* Test route */
app.get("/", (req, res) => {
  res.send("Jet CX Backend Running");
});

/* Payment route */
app.post("/pay", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // 1. Get OAuth token
    const tokenResponse = await axios.post(
      "https://au-0000.sandbox.auth.assemblypay.com/tokens",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        scope: SCOPE
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const accessToken = tokenResponse.data.access_token;

    res.json({
      message: "Token retrieved successfully",
      token_preview: accessToken.substring(0, 10) + "..."
    });

  } catch (error) {
    res.status(500).json({ error: "Something failed" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
