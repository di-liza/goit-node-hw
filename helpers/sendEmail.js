import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const { META_PASS } = process.env;

//  nomurai@meta.ua
// lizadia@meta.ua

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

export default sendEmail;
