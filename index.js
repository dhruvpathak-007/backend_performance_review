const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const reviewRoutes = require("./routes/reviewRoutes");
const gptRoutes = require("./routes/gptRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/reviews", reviewRoutes);

app.use("/api", gptRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
