import { parse } from "cookie";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export function middleware(req) {
  const cookies = parse(req.headers.cookie);
  const token = cookies.token;
  if (!token) {
    // Token is missing, user is not authenticated

    return new NextResponse(
      JSON.stringify({ success: false, message: "authorization failed" }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }

  try {
    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    if (req.query.user_id || req.query.userId) {
      if (
        req.query.user_id !== decodedToken.id ||
        req.query.userId !== decodedToken.id
      ) {
        return new NextResponse(
          JSON.stringify({ success: false, message: "authorization failed" }),
          { status: 401, headers: { "content-type": "application/json" } }
        );
      }
    }
  } catch (error) {
    // Invalid token, user is not authenticated

    return new NextResponse(
      JSON.stringify({ success: false, message: "authorization failed" }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/auth/accountConfig/[userId]",
    "/api/cart/[user_id]",
    "/api/cart/remove/[user_id]",
    "/api/cart/select_toggle/[user_id]",
    "/api/checkout/[userId]",
    "/api/checkout/remove/[userId]",
    "/api/checkout/quantity/[userId]",
    "/api/products/calcRating/[productId]",
    "/api/products/wishlist/[userId]",
    "/api/products/wishlist/remove/[userId]",
    "/api/products/[productId]",
  ],
};
