const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

//google redirect to authorization google account
const authorizationUrl = (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    include_granted_scopes: true,
  });
  console.log("Redirect...");
  res.redirect(authUrl);
};

//callback from google after authentication
const googleCallback = async (req, res) => {
  const { code } = req.query;

  const { tokens } = await oauth2Client.getToken(code.toString());

  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: "v2",
  });

  const { data } = await oauth2.userinfo.get();

  if (!data.email || !data.name) {
    return res.json({
      data: data,
    });
  }

  console.log(data);
  return res.json({
    data: data,
  });
};

module.exports = { authorizationUrl, googleCallback };
