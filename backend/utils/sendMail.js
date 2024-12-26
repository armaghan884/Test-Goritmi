import nodemailer from "nodemailer";
import path, { dirname } from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const sendMail = async (email, option) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", //process.env.MAIL_SERVICES,
    port: 587,
    secure: false, // use SSL

    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS_KEY,
    },
  });

  const { subject, template, data } = option;

  // Getting path to the email template.
  const templatePath = path.join(__dirname, "../mails", template);

  // render the email template with ejs.
  const html = await ejs.renderFile(templatePath, data);

  //Setting mail options.
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject,
    html,
  };
  //Seng mail.
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
