const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2ClientMail = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI_MAIL
);

const sendMail = async (req, res) => {
  oAuth2ClientMail.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
  try {
    const accessToken = await oAuth2ClientMail.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MY_EMAIL,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `Abdullah <yours authorised email ${process.env.MY_EMAIL}>`,
      to: process.env.TARGET_EMAIL,
      subject: "Hello from gmail using API 2",
      text: "Hello from gmail email using API 2",
      html: "<h1>Hello from gmail email using API 2</h1>",
    };

    const result = await transport.sendMail(mailOptions);
    console.log(result);
    res.send("berhasil mengirim email");
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = { sendMail };
