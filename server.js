const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/shorten", async (req, res) => {
  try {
    const response = await axios.post(
      "https://cleanuri.com/api/v1/shorten",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).send(error.message);
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
