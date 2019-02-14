const pool = require("../modules/pool");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("hit get jobs");

  const queryText = "SELECT * FROM job ORDER BY date DESC";
  pool
    .query(queryText)
    .then(result => {
      console.log("query results:", result);
      res.send(result.rows);
    })
    .catch(err => {
      console.log("error making query:", err);
      res.sendStatus(500);
    });
});

module.exports = router;
