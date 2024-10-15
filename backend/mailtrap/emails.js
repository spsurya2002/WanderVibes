import nodemailer from "nodemailer";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

// Configure nodemailer transport (update these values based on your SMTP provider)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Replace with your SMTP server
  port: 465,
  auth: {
    user: "triptales56@gmail.com", // Replace with your SMTP username
    pass: "mxuihzxjnkdfqdke", // Replace with your SMTP password
  },
});

// Common email sending function
const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: '"Trip Tales" <triptales56@gmail.com>', // Change sender email
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", info);
  } catch (error) {
    console.error(`Error sending email:`, error);
    throw new Error(`Failed to send email: ${error}`);
  }
};

// Send Verification Email
export const sendVerificationEmail = async (email, verificationToken) => {
  const html = VERIFICATION_EMAIL_TEMPLATE.replace(
    "{verificationCode}",
    verificationToken
  );
  await sendEmail(email, "Verify your email", html);
};

// Send Welcome Email
export const sendWelcomeEmail = async (email, name) => {
  const html = WELCOME_EMAIL_TEMPLATE.replace(/{name}/g, name);
  await sendEmail(email, "Welcome to TravelliFy!", html);
};

// Send Password Reset Email
export const sendPasswordResetEmail = async (email, resetURL) => {
  const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL);
  await sendEmail(email, "Reset your password", html);
};

// Send Password Reset Success Email
export const sendResetSuccessEmail = async (email) => {
  const html = PASSWORD_RESET_SUCCESS_TEMPLATE;
  await sendEmail(email, "Password Reset Successful", html);
};
