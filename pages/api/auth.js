// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  try {
    //get creds
    //check creds
    //await findUser
    //success-> give back userProfile + token/session/cookie
    return res.status(200).json({ name: "John Doe" });
  } catch (error) {
    //failure->throw error
    return res.status(500).json("something went wrong with the server");
  }
}
