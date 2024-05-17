"use server";

import prisma from "@/lib/prisma";

export const setAccountInfo = async (
  userId: string,
  { firstName, lastName }: { firstName: string; lastName: string }
) => {
  try {
    if (firstName.trim().length <= 0 || lastName.trim().length <= 0) return {
      ok: false,
      message: "No se pudo guardar la informacion del usuario"
    };

    const accountUpdated = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: firstName,
        lastName: lastName,
      },
      select: {email: true, firstName: true, lastName: true}
    });
    return {
      ok: true,
      message: "Usuario actualizado correctamente",
      account: accountUpdated,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo actualizar la informacion de la cuenta",
    };
  }
};
