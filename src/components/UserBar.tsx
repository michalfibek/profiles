import { userLoggedSchema } from "@/schemas/userSchema";

import Link from "next/link";
import { z } from "zod";

export default function UserBar({
  user,
}: {
  user: z.infer<typeof userLoggedSchema> | null | undefined;
}) {
  return (
    <span className={`inline-block border-b-2 border-transparent py-1`}>
      {user ? (
        <>
          <span>{user.email}</span>
          <Link
            href={`/api/auth/signout?callbackUrl=/`}
            className="bg-purple-200 px-2 py-1 rounded-md ml-2"
          >
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link href={`/api/auth/signin`} className="bg-purple-200 px-2 py-1 rounded-md ml-2">
            Login
          </Link>
          <Link href={`/auth/signup`} className="bg-gray-200 px-2 py-1 rounded-md ml-2">
            Register
          </Link>
        </>
      )}
    </span>
  );
}
