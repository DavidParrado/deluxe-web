'use client';

import { faUser, faBagShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Logo } from "./Logo"
import { SearchBar } from "./SearchBar"
import Link from "next/link"
import { useEffect, useState } from "react";

export const TopBar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

      {/* Hamburger menu */}
      <button
        onClick={() => setIsMenuOpen((val) => !val)}
        className="md:hidden flex items-center text-black hover:bg-blue-100 transition-colors duration-300 transform p-2 rounded"
      >
        {
          isMenuOpen ? (
            <svg className="block h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          )
        }
      </button>

      {
        isMenuOpen && (
          <div className="w-full h-full flex flex-col justify-start md:hidden bg-blue-200 fixed top-14 left-0 border border-blue-100">
            <ul className="h-full flex flex-col p-10 gap-10">
              <li className="text-black capitalize">camisetas</li>
              <li className="text-black capitalize">pantalones</li>
              <li className="text-black capitalize">hombres</li>
              <li className="text-black capitalize">mujeres</li>
              <li className="text-black capitalize">niños</li>
            </ul>
            <div className="w-full bg-black text-white py-3 px-5 flex items-center gap-2 cursor-pointer mt-4 hover:bg-slate-800 transition-colors duration-300">
              <FontAwesomeIcon icon={faUser} width={14} height={14} />
              <Link href={'/products'}>Iniciar sesion</Link>
            </div>
          </div>
        )
      }

      {/* Cuenta y Compras buttons */}
      <div className="w-fit h-fit hidden md:flex items-center gap-4 lg:gap-8">
        {/* Account button */}
        <Link href={'/productos'} className="flex items-center gap-2 cursor-pointer hover:bg-blue-100 transition-colors duration-300 transform p-2 rounded">
          <FontAwesomeIcon icon={faUser} className="text-black" width={20} height={20} />
          <span className="h-full">Cuenta</span>
        </Link>

        {/* Shopping button */}
        <Link href={'/cart'} className="flex items-center gap-2 cursor-pointer hover:bg-blue-100 transition-colors duration-300 transform p-2 m-[-0.5rem] rounded">
          <FontAwesomeIcon icon={faBagShopping} className="text-black" width={20} height={20} />
          <span>Compras</span>
        </Link>

      </div>
    </div>

  )
}
