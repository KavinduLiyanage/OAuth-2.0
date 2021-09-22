//import library
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { google } = require("googleapis");
const fs = require("fs");
const formidable = require("formidable");
const credentials = require("./credentials.json");


//Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started ${PORT}`));