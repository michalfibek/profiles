"use server";

import z from "zod";
import { profileSchema } from "@/schemas/profileSchema";
import prisma from "@/lib/db";

function parseData(data: z.infer<typeof profileSchema>) {
  const parsed = profileSchema.safeParse({
    firstName: data.firstName,
    lastName: data.lastName,
    birthDate: data.birthDate,
    description: data.description,
    photoUrl: data.photoUrl,
  });

  if (!parsed.success) {
    throw new Error("Validation error"); // Or handle it gracefully
  }

  return parsed.data;
}

export async function createProfile(data: z.infer<typeof profileSchema>) {
  console.log("creating");
  await prisma.profile.create({
    data: parseData(data),
  });
}
export async function updateProfile(id: number, data: z.infer<typeof profileSchema>) {
  console.log("updating");
  await prisma.profile.update({
    where: {
      id,
    },
    data: parseData(data),
  });
}
