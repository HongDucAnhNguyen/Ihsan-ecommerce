import sgMail from "@sendgrid/mail";

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

   
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      await sgMail.send({
        to: process.env.SENDER_EMAIL,
        from: process.env.SENDER_EMAIL,
        subject: contactFormData.contactSubject,
        text:
          " A user named " +
          contactFormData.contactName +
          " wrote: " +
          contactFormData.contactMessage,
        html: "<h4>a visitor of the website has sent a contact message!</h4>",
      });
      await sgMail.send({
        to: contactFormData.contactEmail,
        from: process.env.SENDER_EMAIL,
        subject: "Ticket Created",
        text:
          "Dear " +
          contactFormData.contactName +
          ". Thank you for reaching out to us at Your Shop Name. We have received your message and appreciate your interest in our products/services. Our team will review your inquiry and respond as soon as possible.",
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
