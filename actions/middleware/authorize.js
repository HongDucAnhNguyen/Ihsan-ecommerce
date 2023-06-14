import { parse } from "cookie";
import jwt from "jsonwebtoken";
export const authorize = (req) => {
  try {
    const cookies = parse(req.headers.cookie);
    const token = cookies.token;

    if (!token) {
      // Token is missing, user is not authenticated
      console.log("no tokens found, unauthorized access");
      return false;
    }
    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    if (req.query.user_id || req.query.userId) {
      if (
        req.query.user_id !== decodedToken.id ||
        req.query.userId !== decodedToken.id
      ) {
        console.log("token information invalid");
        return false;
      }
    }
    console.log("valid token, authorization successful");
    return;
  } catch (error) {
    console.log(error);
    // Invalid token, user is not authenticated
    return false;
  }
};
