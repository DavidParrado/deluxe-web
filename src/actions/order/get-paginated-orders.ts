import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginatedOrders = async ({ page = 1, take = 12 }) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe de estar autenticado",
    };
  }

  const orders = await prisma.order.findMany({
    take: take,
    skip: (page - 1) * take,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      OrderAddress: {
        select: {
          firstName: true,
          lastName: true,
          phone: true,
        },
      },
    },
  });

  const totalCount = await prisma.order.count();
  const totalPages = Math.ceil(totalCount / take);

  return {
    ok: true,
    orders: orders,
    totalPages,
    currentPage: page
  };
};
