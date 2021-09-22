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

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Server init
app.get('/', (req, res) => res.send(' API Running'));

//Get OAuthURL
app.get('/getAuthURL', (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPE,
  });
  console.log("Response Code: ",authUrl);
  return res.send(authUrl);
});

//Get token from OAuthURL
app.post('/getToken', (req, res) => {
  if (req.body.code == null) return res.status(400).send('Invalid Request');
  oAuth2Client.getToken(req.body.code, (err, token) => {
      if (err) {
          console.error('Error retrieving access token', err);
          return res.status(400).send('Error retrieving access token');
      }
      res.send(token);
  });
});


//Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started ${PORT}`));