import jwt from "jsonwebtoken";
import { parse } from "cookie";
export const authorize = (req, res, userId) => {
  const cookies = parse(req.headers?.cookie || "");
  const token = cookies?.token;

  if (!token) {
    // Token is missing, user is not authenticated
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    if (userId !== decodedToken?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    // Invalid token, user is not authenticated
    return res.status(401).json({ message: "Unauthorized" });
  }
};
