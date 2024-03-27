const express = require("express");
const router = express.Router();
const db = require("../database");

router.get('/', async (req, res) => {
  try {
    const allTeams = await db.select('*').from('teams');
    res.json(allTeams); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred while processing your request.' });
  }
});

router.post("/", async (request, response) => {
  const addTeam = request.body;
  addTeam.created_date = new Date();

  try {
    await db("teams").insert(addTeam);
    response.status(201).json("New team has been added");
  } catch (error) {
    console.error(error); 
    response.status(500).json({ error: "Failed to add a new member" });
  }
});

module.exports = router;