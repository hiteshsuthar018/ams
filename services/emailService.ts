import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export async function sendCredentialsEmail(
  email: string,
  password: string
) {

    console.log("email user", process.env.EMAIL_USER)
    console.log("email pass", process.env.EMAIL_PASS)
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Kadel Labs Training Portal Login Credentials",
    html: `
      <h2>Your Trainee Account Created</h2>
      <p>Email: ${email}</p>
      <p>Password: ${password}</p>
      <p>Please login and change your password.</p>
    `
  }

  await transporter.sendMail(mailOptions)
}