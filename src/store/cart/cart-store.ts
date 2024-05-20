import { CartProduct, Product } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };

  // actions

  getTotalItems: () => number;
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Methods
      getTotalItems() {
        const { cart } = get();
        return cart.reduce((total, item) => item.quantity + total, 0);
      },
      getSummaryInformation() {
        const { cart } = get();
        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );

        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => item.quantity + total,
          0
        );
        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },
      addProductToCart(product: CartProduct) {
        const { cart } = get();
        // 1. Revisar si ya esta el producto seleccionado
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // 2. Se que el producto existe por talla tengo que actualizarlo
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },
      updateProductQuantity(product, quantity) {
        const { cart } = get();

        const updatedCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: quantity,
            };
          }
          return item;
        });

        set({ cart: updatedCart });
      },
      removeProduct(product) {
        const { cart } = get();
        const cartFiltered = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );
        console.log({ cartFiltered, cart });
        set({ cart: cartFiltered });
      },
      clearCart() {
        set({ cart: [] });
      },
    }),

    {
      name: "shopping-cart",
      // skipHydration: true,
    }
  )
);
