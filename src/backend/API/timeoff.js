const express = require("express");
const router = express.Router();
const db = require("../database");

router.get('/', async (req, res) => {
  try {
    const allTimeOffs = await db.select('*').from('timeoff');
    res.json(allTimeOffs); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred while processing your request.' });
  }
});

router.post("/", async (request, response) => {
  const addTimeOff = request.body;
  addTimeOff.created_date = new Date();

  try {
    await db("timeoff").insert(addTimeOff);
    response.status(201).json("New timeoff has been added");
  } catch (error) {
    console.error(error); 
    response.status(500).json({ error: "Failed to add a new timeoff" });
  }
});

module.exports = router;
