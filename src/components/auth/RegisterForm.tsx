'use client';

import Link from 'next/link';
import React from 'react'

export const RegisterForm = () => {
  return (
    <div className="w-full lg:w-2/3 flex justify-center items-center">

      <form className="bg-white rounded-md shadow-2xl p-5 w-full max-w-[30rem]">

        <h1 className="text-gray-800 font-bold text-2xl mb-1">Bienvenido a deluxe</h1>
        <p className="text-sm font-normal text-gray-600 mb-8">Registrate aqui!</p>

        <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
          <svg className="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd" />
          </svg>
          <input id="name" className=" pl-2 w-full outline-none border-none text-gray-600" type="text" name="name" placeholder="Nombres" />
        </div>

        <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
          <input id="email" className=" pl-2 w-full outline-none border-none text-gray-600" type="email" name="email" placeholder="Correo electronico" />
        </div>

        <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <input className="pl-2 w-full outline-none border-none text-gray-600" type="password" name="password" id="password" placeholder="Contraseña" />
        </div>

        <button type="submit" className="block w-full bg-slate-800 mt-5 py-2 rounded-2xl hover:bg-slate-700 transition-all duration-500 text-white font-semibold mb-2">Iniciar sesion</button>

        <div className="flex justify-between mt-4">
          <Link href="/" className="text-sm ml-2 hover:text-blue-500 cursor-pointer duration-500 transition-all">Regresar</Link>
          <Link href="/auth/login" className="text-sm ml-2 hover:text-blue-500 cursor-pointer duration-500 transition-all">Iniciar sesion</Link>
        </div>

      </form>
    </div>
  )
}
