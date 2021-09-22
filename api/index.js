//import library
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { google } = require("googleapis");
const fs = require("fs");
const formidable = require("formidable");
const credentials = require("./credentials.json");

//import library
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { google } = require("googleapis");
const fs = require("fs");
const formidable = require("formidable");
const credentials = require("./credentials.json");

//initialize credentials
const client_id = credentials.web.client_id;
const client_secret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

const SCOPE = ['https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file']


//Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started ${PORT}`));