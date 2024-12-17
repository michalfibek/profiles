"use server";

import prisma from "@/lib/db";

export async function createProfile(formData: FormData) {
  await prisma.profile.create({
    data: {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      description: formData.get("description") as string,
      birthDate: formData.get("birthDate") as string,
    },
  });
}
