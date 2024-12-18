"use server";

import z from "zod";
import { profileSchema } from "@/schemas/profileSchema";
import prisma from "@/lib/db";

function parseProfileData(data: z.infer<typeof profileSchema>) {
  const parsed = profileSchema.safeParse({
    firstName: data.firstName,
    lastName: data.lastName,
    birthDate: data.birthDate,
    description: data.description,
    photoUrl: data.photoUrl,
  });

  if (!parsed.success) {
    throw new Error("Validation error");
  }

  return parsed.data;
}

export async function createProfile(data: z.infer<typeof profileSchema>) {
  await prisma.profile.create({
    data: parseProfileData(data),
  });
}

export async function updateProfile(id: number, data: z.infer<typeof profileSchema>) {
  await prisma.profile.update({
    where: {
      id,
    },
    data: parseProfileData(data),
  });
}

export async function deleteProfile(id: number) {
  await prisma.profile.delete({
    where: {
      id,
    },
  });
}
