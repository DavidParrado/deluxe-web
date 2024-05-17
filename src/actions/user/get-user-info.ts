import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getUserInfo = async (userId: string) => {
  try {
    const session = await auth();
    if (session?.user.id !== userId && session?.user.role !== "admin") {
      return null;
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
