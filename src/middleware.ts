export { default } from "next-auth/middleware";

export const config = { matcher: ["/profiles/:path*", "/users/:path*"] };
