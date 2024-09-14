const axios = require("axios");

const generateFeedback = async (req, res) => {
  const { productivity, teamwork, punctuality, communication, problemSolving } =
    req.body;

  const message = `Generate performance feedback based on the following metrics:\n
  Productivity: ${productivity}\n
  Teamwork: ${teamwork}\n
  Punctuality: ${punctuality}\n
  Communication: ${communication}\n
  Problem-solving: ${problemSolving}. Each rating is out of 10 so you have to judge accordingly. Please also give an overall rating out of 10.`;

  try {
    const response = await axios.post(
      "https://api.cohere.com/v1/chat",
      {
        model: "command-r-plus",
        message: message,
        temperature: 0.3,
        prompt_truncation: "AUTO",
        stream: false,
        connectors: [{ id: "web-search" }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const feedback = response.data.text;

    res.json({ feedback });
  } catch (error) {
    console.error(
      "Error generating feedback with Cohere:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ message: "Failed to generate feedback" });
  }
};

module.exports = { generateFeedback };
