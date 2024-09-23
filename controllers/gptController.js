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

const generateComparisonFeedback = async (req, res) => {
  const { employee1Data, employee2Data, areaOfComparison } = req.body;

  let message = `Compare the performance of two employees based on the following area: ${areaOfComparison}. Each rating is out of 10.\n\n`;

  if (areaOfComparison === "productivity") {
    message += `${employee1Data.employeeName}:\nProductivity: ${employee1Data.productivity}\n\n`;
    message += `${employee2Data.employeeName}:\nProductivity: ${employee2Data.productivity}\n\n`;
  } else if (areaOfComparison === "Punctuality") {
    message += `${employee1Data.employeeName}:\nPunctuality: ${employee1Data.punctuality}\n\n`;
    message += `Employee 2:\nPunctuality: ${employee2Data.punctuality}\n\n`;
  } else if (areaOfComparison === "Teamwork") {
    message += `${employee1Data.employeeName}:\nTeamwork: ${employee1Data.teamwork}\n\n`;
    message += `${employee2Data.employeeName}:\nTeamwork: ${employee2Data.teamwork}\n\n`;
  } else if (areaOfComparison === "Communication") {
    message += `${employee1Data.employeeName}:\nCommunication: ${employee1Data.communication}\n\n`;
    message += `${employee2Data.employeeName}:\nCommunication: ${employee2Data.communication}\n\n`;
  } else if (areaOfComparison === "Problem-solving") {
    message += `${employee1Data.employeeName}:\nProblem-solving: ${employee1Data.problemSolving}\n\n`;
    message += `${employee2Data.employeeName}:\nProblem-solving: ${employee2Data.problemSolving}\n\n`;
  } else if (areaOfComparison === "Evaluation-Period") {
    message += `${employee1Data.employeeName}:\nEvaluation-Period: ${employee1Data.evaluationPeriod} months\n\n`;
    message += `${employee2Data.employeeName}:\nEvaluation-Period: ${employee2Data.evaluationPeriod} months\n\n`;
  } else if (areaOfComparison === "All") {
    message += `${employee1Data.employeeName}:\nProductivity: ${employee1Data.productivity}, Teamwork: ${employee1Data.teamwork},EvaluationPeriod: ${employee1Data.EvaluationPeriod} months, Communication: ${employee1Data.communication}, Punctuality: ${employee1Data.punctuality}, Problem-solving: ${employee1Data.problemSolving}\n\n`;
    message += `${employee2Data.employeeName}:\nProductivity: ${employee2Data.productivity}, Teamwork: ${employee2Data.teamwork},EvaluationPeriod: ${employee2Data.EvaluationPeriod} months, Communication: ${employee2Data.communication}, Punctuality: ${employee2Data.punctuality}, Problem-solving: ${employee2Data.problemSolving}\n\n`;
  }

  message += `Please provide an overall feedback based on the above metrics and give each employee an overall rating out of 10.`;

  try {
    console.log("message is", message);
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
      "Error generating comparison feedback with Cohere:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ message: "Failed to generate comparison feedback" });
  }
};

module.exports = { generateFeedback, generateComparisonFeedback };
