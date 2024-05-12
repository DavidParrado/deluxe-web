import { faUser, faBagShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Logo } from "./Logo"
import { SearchBar } from "./SearchBar"
import Link from "next/link"

export const TopBar = () => {
  return (
    <div className="w-full h-fit py-4 px-20 bg-blue-200 flex justify-between items-center gap-40 fixed top-0 left-0 z-10">
      <Logo />
      <SearchBar />
      {/* Cuenta y Compras buttons */}
      <div className="w-fit h-fit flex items-center gap-8">
        {/* Account button */}
        <Link href={'/productos'} className="flex items-center gap-2 cursor-pointer hover:bg-blue-100 transition-colors duration-300 transform p-2 rounded">
          <FontAwesomeIcon icon={faUser} className="text-black" width={20} height={20} />
          <span className="h-full">Cuenta</span>
        </Link>

        {/* Shopping button */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-blue-100 transition-colors duration-300 transform p-2 m-[-0.5rem] rounded">
          <FontAwesomeIcon icon={faBagShopping} className="text-black" width={20} height={20} />
          <span>Compras</span>
        </div>

      </div>
    </div>

  )
}
