'use client';

import { faUser, faBagShopping, faCartShopping, faHamburger, faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Logo } from "./Logo"
import { SearchBar } from "./SearchBar"
import Link from "next/link"
import { useEffect, useState } from "react";
import { useCartStore, useUIStore } from "@/store";

const menuOptions = [
  { name: 'Camisetas', path: '/category/camisetas' },
  { name: 'Pantalones', path: '/category/pantalones' },
  { name: 'Hombres', path: '/gender/hombres' },
  { name: 'Mujeres', path: '/gender/mujeres' },
  { name: 'Niños', path: '/gender/niños' },
]

export const TopBar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openMenu = useUIStore(state => state.openSideMenu);

  const [loaded, setLoaded] = useState(false);
  const totalItemsInCart = useCartStore(state => state.getTotalItems());

  useEffect(() => {
    setLoaded(true)
  }, []);


  // Disable scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <div className="w-full h-fit py-3 px-5 md:py-4 md:px-10 xl:px-20 bg-blue-200 flex justify-between items-center gap-10 md:gap-12 lg:gap-20 fixed top-0 left-0 z-10">
      <Logo />
      <SearchBar className="hidden md:flex md:max-w-[30rem] min-w-40" />

      <div className="flex items-center gap-8">

        <Link href={'/cart'} className="md:hidden flex items-center gap-2 cursor-pointer hover:bg-blue-100 transition-colors duration-300 transform p-2 m-[-0.5rem] rounded">
          <div className="relative mr-2">
            {(loaded && totalItemsInCart > 0) && (
              <span className="flex justify-center items-center absolute px-[0.3rem] py-[0.1rem] text-xs rounded-full font-bold -top-3 -right-3 bg-blue-950 text-white">{totalItemsInCart}</span>
            )}
            <FontAwesomeIcon icon={faCartShopping} className="text-black" width={20} height={20} />
          </div>
        </Link>

        {/* Hamburger menu */}
        <button
          onClick={() => setIsMenuOpen((val) => !val)}
          className="md:hidden flex items-center text-black hover:bg-blue-100 transition-colors duration-300 transform p-2 rounded"
        >
          {
            isMenuOpen ? (
              <svg className="block h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            )
          }
        </button>
      </div>

      {
        isMenuOpen && (
          <div className="w-full h-full flex flex-col p-10 md:hidden bg-blue-200 fixed top-14 left-0 border border-blue-100 gap-10">

            <ul className="w-full h-full flex flex-col gap-10">
              {
                menuOptions.map(opt => (
                  <li key={opt.path} className="text-black text-2xl capitalize">
                    <Link href={opt.path}>{opt.name}</Link>
                  </li>
                ))
              }
            </ul>

            <div className="h-full w-full flex flex-col gap-8">
              <div className="w-full bg-black text-white py-3 px-5 flex items-center gap-2 cursor-pointer hover:bg-slate-800 transition-colors duration-300">
                <FontAwesomeIcon icon={faBagShopping} width={14} height={14} />
                <Link href={'/cart'}>Compras</Link>
              </div>

              <div className="w-full bg-black text-white py-3 px-5 flex items-center gap-2 cursor-pointer hover:bg-slate-800 transition-colors duration-300">
                <FontAwesomeIcon icon={faUser} width={14} height={14} />
                <Link href={'/account'}>Cuenta</Link>
              </div>
              <div className="w-full mt-8 lg:hidden flex items-center justify-center">
                &copy;Copyright. All rights reserved
              </div>
            </div>

          </div>
        )
      }

      {/* Cuenta y Compras buttons */}
      <div className="w-fit h-fit hidden md:flex items-center gap-4 lg:gap-8">
        {/* Shopping button */}
        <Link href={'/cart'} className="flex items-center gap-2 cursor-pointer hover:bg-blue-100 transition-colors duration-300 transform p-2 m-[-0.5rem] rounded">
          <div className="relative mr-2">
            {(loaded && totalItemsInCart > 0) && (
              <span className="flex justify-center items-center absolute px-[0.3rem] py-[0.1rem] text-xs rounded-full font-bold -top-3 -right-3 bg-blue-950 text-white">{totalItemsInCart}</span>
            )}
            <FontAwesomeIcon icon={faCartShopping} className="text-black" width={20} height={20} />
          </div>
          Carrito
        </Link>
        {/* Account button */}
        <button
          className="flex items-center gap-2 -mr-[6px] cursor-pointer hover:bg-blue-100 transition-colors duration-300 transform p-2 rounded"
          onClick={() => openMenu()}
        >
          <FontAwesomeIcon icon={faBars} className="text-black" width={20} height={20} />
          <span className="h-full">Menu</span>
        </button>

      </div>

    </div>

  )
}
