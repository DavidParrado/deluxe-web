"use server";

import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: { userId: userId },
      include: {
        country: true,
      },
    });

    if (!address) return null;

    return address;
  } catch (error) {
    console.log(error);
    return null;
  }
};
