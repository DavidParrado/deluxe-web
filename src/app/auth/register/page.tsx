import Image from "next/image";

import { RegisterForm } from "@/components";

export default function RegisterPage() {
  return (
    <div className="bg-blue-50 h-full w-full flex flex-col items-center justify-between lg:flex-row px-[5%] py-[10%] md:p-[10%] lg:p-0 gap-10 lg:gap-0">
      <Image src={'/imgs/toa-heftiba--abWByT3yg4-unsplash.jpg'} alt="background" className="hidden w-full lg:block lg:w-1/2 lg:max-h-screen object-cover" width={800} height={800} />

      {/* Form */}
      <RegisterForm />
      {/* Copyright */}

      <div className="w-full lg:hidden flex items-center justify-center">
        &copy;Copyright. All rights reserved
      </div>
    </div>
  )
}