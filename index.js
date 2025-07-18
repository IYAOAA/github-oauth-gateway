const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

app.post("/auth", async (req, res) => {
  const code = req.body.code;
  if (!code) return res.status(400).json({ error: "Missing code" });

  try {
    const tokenRes = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id,
        client_secret,
        code
      },
      {
        headers: {
          Accept: "application/json"
        }
      }
    );

    const accessToken = tokenRes.data.access_token;
    res.json({ token: accessToken });
  } catch (err) {
    res.status(500).json({ error: "OAuth failed", details: err.message });
  }
});

app.listen(3000, () => {
  console.log("OAuth Gateway running on port 3000");
});