"use server";

import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const user = await prisma.user.create({
      data: {
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    return {
      ok: true,
      user: user,
      message: "Usuario creado",
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message:
        error?.code === "P2002"
          ? "Ya existe un usuario con ese correo"
          : "No se pudo crear el usuario",
    };
  }
};
