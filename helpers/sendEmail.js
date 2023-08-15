import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const { META_PASS } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "lizadia@meta.ua",
    pass: META_PASS,
  },
};
const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: "lizadia@meta.ua",
  };
  await transport.sendMail(email);
  return true;
};

// const email = {
//   from: "lizadia@meta.ua",
//   to: "liza.diachenko.99@gmail.com",
//   subject: "Hello ✔",
//   text: "Hello world?",
//   html: "<b>Hello world?</b>",
// };

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));

export default sendEmail;
