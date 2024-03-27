require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const teamsRouter = require("./API/teams");
const membersRouter = require("./API/members");
const timeoffRouter = require("./API/timeOff");
const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000; 
const cors = require("cors");

app.use(express.static(buildPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:4051',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use("/api/teams", teamsRouter);
app.use("/api/members", membersRouter);
app.use("/api/timeoff", timeoffRouter);


module.exports = app;
