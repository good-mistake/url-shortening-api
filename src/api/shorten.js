import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await axios.post(
        "https://cleanuri.com/api/v1/shorten",
        { url: req.body.url },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).send(error.message);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
