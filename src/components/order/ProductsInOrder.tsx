'use client';
import { useCartStore } from "@/store";
import { useState, useEffect } from "react";
import { ProductImage } from "../product/product-image/ProductImage";
import { QuantitySelector } from "../product/quantity-selector/QuantitySelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { currencyFormat } from "@/utils";

export const ProductsInOrder = () => {
  const [loaded, setLoaded] = useState(false);

  const productsInCart = useCartStore(state => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, [])

  if (!loaded) {
    return <p>Loading...</p>
  }

  return (
    <>
      {
        productsInCart.map(product => (
          <div key={`${product.slug}-${product.size}`} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <ProductImage src={product.image} alt="product-image" width={600} height={600} className="w-full rounded-lg sm:w-40" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div className="mt-5 sm:mt-0">
                <Link href={`/product/${product.slug}`} className="text-lg font-bold text-gray-900 hover:underline">{`${product.title} (${product.quantity})`}</Link>
                <p className="mt-1 text-base text-gray-700">{product.size}</p>
                <p className="mt-1 text-base text-gray-700">{currencyFormat(product.price)}</p>
              </div>
             
            </div>
          </div>
        ))
      }
    </>
  )
}
