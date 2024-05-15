'use client';

import { login } from "@/actions";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  email: string;
  password: string;
}

export const LoginForm = () => {

  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, formState: { errors, isValid }, setError, clearErrors, watch } = useForm<FormInputs>();

  watch('email');
  watch('password');

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    // clearErrors();

    const { email, password } = data;
    console.log(data)
    if (password.trim().length <= 0) {
      console.log('Primera validacoin')
      setError('password', { message: 'Los valores no pueden ser espacios' })
    }

    console.log('Mirando los errores')
    console.log({errors})

    if (Object.values(errors).length > 0) {
      return;
    };

    // Server action
    const resp = await login(email.toLowerCase(), password);
    if (!resp.ok) {
      setErrorMessage(resp.message ?? "No se pudo iniciar sesion, intenta de nuevo")
      return;
    }
    window.location.replace('/')
  }


  return (
    <div className="w-full lg:w-2/3 flex justify-center items-center">

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-md shadow-2xl p-5 w-full max-w-[30rem]">

        <h1 className="text-gray-800 font-bold text-3xl mb-1">Hola de nuevo!</h1>
        <p className="text-lg font-normal text-gray-600 mb-4">Bienvenido</p>

        <div className='w-full flex flex-col gap-5'>
          <div className={`flex items-center border-2 py-2 px-4 rounded-2xl ${errors.email && 'border-red-500'}`}>
            <FontAwesomeIcon icon={faEnvelope} className='w-4 h-4 text-gray-400' />
            <input
              className="pl-2 w-full outline-none border-none"
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
              className="pl-2 w-full outline-none border-none"
              type="password"
              placeholder="Contraseña"
              {...register('password', { required: true })}
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

        <button className="block w-full bg-slate-800 mt-5 py-2 rounded-2xl hover:bg-slate-700 transition-all duration-500 text-white font-semibold mb-2">Iniciar sesion</button>

        <div className="flex justify-between mt-4">
          <Link href="/" className="text-sm ml-2 hover:text-blue-500 cursor-pointer duration-500 transition-all">Regresar</Link>

          <Link href="/auth/register" className="text-sm ml-2 hover:text-blue-500 cursor-pointer duration-500 transition-all">Registrate</Link>
        </div>

      </form>
    </div>
  )
}
