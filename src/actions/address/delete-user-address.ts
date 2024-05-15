"use server";

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    await prisma.userAddress.delete({
      where: {
        userId: userId,
      },
    });
    return {
      ok: true,
      message: "Direccion del usuario eliminada correctamente",
    };
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo eliminar la direccion del usuario");
  }
};
