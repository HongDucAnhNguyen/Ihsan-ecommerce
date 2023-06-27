import nodemailer from "nodemailer";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const contactFormData = req.body;
    if (
      !contactFormData.contactName ||
      !contactFormData.contactEmail ||
      !contactFormData.contactSubject ||
      !contactFormData.contactMessage
    ) {
      return res.status(400).json({ message: "Bad Request" });
    }

    console.log(contactFormData);
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.SENDER_EMAIL_PASS,
        },
      });
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: process.env.SENDER_EMAIL,
      };
      await transporter.sendMail({
        ...mailOptions,
        subject: contactFormData.contactSubject,
        text: "Testing",
        html: "<h1>Test title</h1><p>test body</p>",
      });
      return res.status(200).end();
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ message: "something went wrong with the server" });
    }
  } else return res.status(400).json({ message: "Bad Request" });
};
export default handler;
