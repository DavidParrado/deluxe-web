"use server";

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

// Order, itemsInOrder and address order
export const placeOrder = async (
  productsIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;
  // Verificar sesion de usuario
  if (!userId) {
    return { ok: false, message: "No hay sesion de usuario" };
  }
  // Create order
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsIds.map((p) => p.productId),
      },
    },
  });

  // Calcular los montos // Encabezado
  const itemsInOrder = productsIds.reduce((count, p) => p.quantity + count, 0);
  const { subTotal, tax, total } = productsIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId} no existe - 500`);

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.19;
      totals.total += subTotal * 1.19;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  try {
    // Crear la transaccion de la base de datos
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos
      const updatedProductPromises = products.map((product) => {
        // Acumular los valores
        const productQuantity = productsIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);
        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`);
        }

        // const updatedInStock = product.inStock - productQuantity; // ! No hacer

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductPromises);
      // Verificar valores negativos en el stock -- No hay stock
      updatedProducts.forEach((product) => {
        if (product.inStock < 0)
          throw new Error(`${product.title} no tiene inventario suficiente`);
      });

      // 2. Crear la orden - Encabezado - Detalles
      const order = await tx.order.create({
        data: {
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,
          userId: userId,

          OrderItem: {
            createMany: {
              data: productsIds.map((p) => {
                return {
                  price:
                    products.find((product) => product.id === p.productId)
                      ?.price ?? 0,
                  productId: p.productId,
                  quantity: p.quantity,
                  size: p.size,
                };
              }),
            },
          },
        },
      });
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country.id,
          orderId: order.id,
        },
      });

      // Validar, si el price es cero, entonces, lanzar un error

      // 3. Crear la direccion
      return {
        updatedProducts: updatedProducts,
        order: order,
        orderAddress: orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
