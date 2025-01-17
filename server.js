const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Store correct answers server-side
const correctAnswers = {
  step1: "SHERLOCK_SOLVE_THE_FIRST_PUDLE",
  step2: "221B Baker Street holds secrets; find the pattern in the ordinary.",
  step3: "FLAG{ARTHUR_CONAN_DOYLE_MYSTERY_SOLVED}"
};

// Endpoint to validate answers
app.post('/check-answer', (req, res) => {
  const { step, answer } = req.body;

  if (!step || !answer) {
    return res.status(400).json({ success: false, message: "Invalid request" });
  }

  // Check if the answer is correct
  if (correctAnswers[step] && correctAnswers[step] === answer.trim()) {
    return res.json({ success: true });
  }

  res.json({ success: false });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
