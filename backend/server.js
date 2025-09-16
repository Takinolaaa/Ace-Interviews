const express = require("express");
const app = express();
//imported connection from db.js
const connection = require("./db");
//middleware to allow allow request from the frontend
const cors = require("cors");
app.use(cors());

//questions from database
app.get("/api/questions", (req, res) => {
  const sql = "SELECT * FROM questions";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    console.log(results);
    return res.json(results);
  });
});

//audio recordings
app.get("/api/audio_data", (req, res) => {
  const sql = "SELECT * FROM audio_data";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    console.log(results);
    return res.json(results);
  });
});

app.delete("/api/delete", (req, res) => {
  const sql = "DELETE FROM audio_data";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    console.log(results);
    return res.json(results);
  });
});

app.post("/api/audio_data", (req, res) => {
  const { audioUrl } = req.body;

  connection.query(
    "INSERT INTO audio_data (audio_data) VALUES (?)",
    [audioUrl],
    (err, result) => {
      if (err) {
        return res.status(500).send("Error saving audio URL");
      }
      res.send("Audio URL saved successfully");
    }
  );
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
