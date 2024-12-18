"use server";

import z from "zod";
import prisma from "@/lib/db";
import { userRegistrationSchema } from "@/schemas/userSchema";
import { getPasswordHash } from "@/lib/utils";

async function parseUserData(data: z.infer<typeof userRegistrationSchema>) {
  const parsed = userRegistrationSchema.safeParse({
    email: data.email,
    password: data.password,
  });

  if (!parsed.success) {
    throw new Error("Validation error");
  }

  return parsed.data;
}

export async function createUser(data: z.infer<typeof userRegistrationSchema>) {
  const userData = await parseUserData(data);
  const hash = await getPasswordHash(data.password);

  await prisma.user.create({
    data: { ...userData, password: hash },
  });
}

export async function deleteUser(id: number) {
  await prisma.user.delete({
    where: {
      id,
    },
  });
}

// export async function updateUser(id: number, data: z.infer<typeof userRegistrationSchema>) {
//   const userData = await parseUserData(data);

//   const hash = await getPasswordHash(data.password);

//   await prisma.profile.update({
//     where: {
//       id,
//     },
//     data: { ...userData, password: hash },
//   });
// }
