const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const asyncHandler = require("express-async-handler");

import createTournament from "./functions/createTournament.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer();

app.post(
  "/",
  upload.none(),
  asyncHandler(async (req, res, next) => {
    console.log(req.body);
    res.json(req.body);
  })
);

app.listen(5000, () => console.log("Example app is listening on port 5000."));
