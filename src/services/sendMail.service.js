require('dotenv').config();

const sendGrid = require('@sendgrid/mail');
sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMail(data) {
  const { to, subject, html } = data;
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject,
    html,
  };
  try {
    return await sendGrid.send(msg);
  } catch (error) {
    console.log(error);
    throw new Error('Internal server error');
  }
}

module.exports = { sendMail };
