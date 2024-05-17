'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faRightToBracket, faBagShopping, faUser, faUsers, faXmark, faBookmark, faStore } from '@fortawesome/free-solid-svg-icons';
import { useUIStore } from '@/store';
import { useSession } from 'next-auth/react';
import { logout } from '@/actions';
import { useRouter } from 'next/navigation';

interface Props {
  className?: string;
}

export const Sidebar = ({ className }: Props) => {
  const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
  const closeMenu = useUIStore(state => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  return (
    <div className={className}>
      {/* Background black */}
      {
        isSideMenuOpen && (
          <div
            className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
          />
        )
      }
      {/* Blur */}
      {
        isSideMenuOpen && (
          <div
            onClick={closeMenu}
            className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
          />
        )
      }

      {/* Sidemenu */}
      <nav
        className={`fixed p-5 right-0 top-0 w-[500px] h-screen bg-blue-100 z-20 shadow-2xl transform transition-all duration-300 ${!isSideMenuOpen && 'translate-x-full'}`}>
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute top-5 right-5 cursor-pointer h-8 w-8"
          onClick={() => closeMenu()}
        />
        <div className="w-full h-px bg-white mt-12 mb-10" />

        {/* Menu */}

        {/* Authenticated */}
        {
          isAuthenticated && (
            <>
              <Link
                href="/account"
                onClick={() => closeMenu()}
                className="flex items-center p-2 hover:bg-blue-50 py-4 rounded transition-all"
              >
                <FontAwesomeIcon icon={faUser} className='h-8 w-8' />
                <span className="ml-3 text-xl">Perfil</span>
              </Link>

              <Link
                href="/orders"
                className="flex items-center mt-10 p-2 hover:bg-blue-50 py-4 rounded transition-all"
              >
                <FontAwesomeIcon icon={faBagShopping} className='h-8 w-8' />
                <span className="ml-3 text-xl">Ordenes</span>
              </Link>

              <button
                className="flex w-full items-center mt-10 p-2 hover:bg-blue-50 py-4 rounded transition-all"
                onClick={async() => {
                  await logout()
                  closeMenu()
                  window.location.reload()
                  
                }}
              >
                <FontAwesomeIcon icon={faRightFromBracket} className='h-8 w-8' />
                <span className="ml-3 text-xl">Salir</span>
              </button>
            </>
          )
        }

        {/* Not authenticated */}
        {
          !isAuthenticated && (
            <Link
              href="/auth/login"
              className="flex items-center mt-10 p-2 hover:bg-blue-50 py-4 rounded transition-all"
            >
              <FontAwesomeIcon icon={faRightToBracket} className='h-8 w-8' />
              <span className="ml-3 text-xl">Ingresar</span>
            </Link>
          )
        }

        {/* Admin routes */}
        {
          isAdmin &&
          <>
            <div className="w-full h-px bg-white my-10" />
            <Link
              href="/admin/users"
              className="flex items-center mt-10 p-2 hover:bg-blue-50 py-4 rounded transition-all"
              onClick={() => closeMenu()}
            >
              <FontAwesomeIcon icon={faUsers} className='h-8 w-8' />
              <span className="ml-3 text-xl">Usuarios</span>
            </Link>

            <Link
              href="/admin/orders"
              className="flex items-center mt-10 p-2 hover:bg-blue-50 py-4 rounded transition-all"
              onClick={() => closeMenu()}
            >
              <FontAwesomeIcon icon={faBagShopping} className='h-8 w-8' />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center mt-10 p-2 hover:bg-blue-50 py-4 rounded transition-all"
              onClick={() => closeMenu()}
            >
              <FontAwesomeIcon icon={faStore} className='h-8 w-8' />
              <span className="ml-3 text-xl">Productos</span>
            </Link>

            <Link
              href="/admin/users"
              className="flex items-center mt-10 p-2 hover:bg-blue-50 py-4 rounded transition-all"
              onClick={() => closeMenu()}
            >
              <FontAwesomeIcon icon={faBookmark} className='h-8 w-8' />
              <span className="ml-3 text-xl">Categorias</span>
            </Link>
          </>
        }

      </nav>

    </div >
  )
}
