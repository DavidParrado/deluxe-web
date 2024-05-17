'use client';

import { login, registerUser } from '@/actions';
import { faAddressBook, faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';

type FormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


const schemaValidator: ZodType<FormInputs> = z.object({
  firstName: z.string().min(1, "No debe estar vacio").trim().min(1, "No puede tener espacios"),
  lastName: z.string().min(1, "No debe estar vacio").trim().min(1, "No puede tener espacios"),
  email: z.string().email("Debe ser un email valido"),
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "La contraseña debe tener minimo 8 caracteres, al menos una letra y un numero"),
})

export const RegisterForm = () => {

  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormInputs>({ resolver: zodResolver(schemaValidator) });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');

    const { firstName, lastName, email, password } = data;
    console.log("Paseee")

    // Server action
    const resp = await registerUser(firstName, lastName, email, password);
    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    };

    await login(email.toLowerCase(), password);
    window.location.replace('/')

  }


  return (
    <div className="w-full lg:w-2/3 flex justify-center items-center">

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-md shadow-2xl p-5 w-full max-w-[30rem]">

        <h1 className="text-gray-800 font-bold text-3xl mb-1">Bienvenido a deluxe</h1>
        <p className="text-lg font-normal text-gray-600 mb-4">Registrate aqui!</p>

        <div className='w-full flex flex-col gap-5'>
          <div className={`flex items-center border-2 py-2 px-4 rounded-2xl ${errors.firstName && 'border-red-500'}`}>
            <FontAwesomeIcon icon={faAddressBook} className='w-4 h-4 text-gray-400' />
            <input
              className={`pl-2 w-full outline-none border-none text-gray-600`}
              type="text"
              placeholder="Nombres"
              {...register('firstName', { required: true })}
            />
          </div>
          {
            errors.firstName?.message && (
              <span className='-my-4 text-red-500'>{errors.firstName.message}</span>
            )
          }

          <div className={`flex items-center border-2 py-2 px-4 rounded-2xl ${errors.lastName && 'border-red-500'}`}>
            <FontAwesomeIcon icon={faAddressBook} className='h-4 w-4 text-gray-400' />
            <input
              className={`pl-2 w-full outline-none border-none text-gray-600`}
              type="text"
              placeholder="Apellidos"
              {...register('lastName', { required: true })}
            />
          </div>
          {
            errors.lastName?.message && (
              <span className='-my-4 text-red-500'>{errors.lastName.message}</span>
            )
          }

          <div className={`flex items-center border-2 py-2 px-4 rounded-2xl ${errors.email && 'border-red-500'}`}>
            <FontAwesomeIcon icon={faEnvelope} className='w-4 h-4 text-gray-400' />
            <input
              className={`pl-2 w-full outline-none border-none text-gray-600`}
              type="email"
              placeholder="Correo electronico"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
          </div>
          {
            errors.email?.message && (
              <span className='-my-4 text-red-500'>{errors.email.message}</span>
            )
          }

          <div className={`flex items-center border-2 py-2 px-4 rounded-2xl ${errors.password && 'border-red-500'}`}>
            <FontAwesomeIcon icon={faLock} className='w-4 h-4 text-gray-400' />
            <input
              className={`pl-2 w-full outline-none border-none text-gray-600`}
              type="password"
              placeholder="Contraseña"
              {...register('password', { required: true, minLength: 6 })}
            />
          </div>
          {
            errors.password?.message && (
              <span className='-my-4 text-red-500'>{errors.password.message}</span>
            )
          }

        </div>

        {
          errorMessage && (
            <span className="text-red-500">*{errorMessage}</span>
          )
        }

        <button
          className="block w-full bg-slate-800 mt-5 py-2 rounded-2xl hover:bg-slate-700 transition-all duration-500 text-white font-semibold mb-2">
          Crear cuenta
        </button>

        <div className="flex justify-between mt-4">
          <Link href="/" className="text-sm ml-2 hover:text-blue-500 cursor-pointer duration-500 transition-all">Regresar</Link>
          <Link href="/auth/login" className="text-sm ml-2 hover:text-blue-500 cursor-pointer duration-500 transition-all">Iniciar sesion</Link>
        </div>

      </form>
    </div>
  )
}
