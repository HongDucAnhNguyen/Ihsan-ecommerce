import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
export function middleware(req) {
  try {
    // Verify and decode the token

    const cookies = req.cookies;
    const token = cookies.get("token").value;

    verifyToken(token);

    
  } catch (error) {
    // Invalid token, user is not authenticated

    
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "authorization failed",
        status: 401,
        headers: { "content-type": "application/json" },
      })
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/auth/admin/adminVerify",
    "/api/auth/accountConfig/[userId]",
    "/api/cart/:path*",
    "/api/checkout/:path*",
    "/api/products/calcRating/[productId]",
    "/api/products/wishlist/:path*",
    "/api/products/[productId]",
    "/api/products/",
    "/api/products/wishlist/:path*",
  ],
};

const verifyToken = async (jwt) => {
   await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_KEY)
  );
 
  
};
