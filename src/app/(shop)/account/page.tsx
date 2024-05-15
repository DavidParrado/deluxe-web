import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

const user = {
  firstName: 'Juan David',
  lastName: 'Grimaldo Parrado',
  email: 'juandparrado04@gmail.com',
  address: 'Calle 25M #20d-20',
  city: 'Villavicencio',
  country: 'Colombia',
  zipCode: '500001'
}


export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    // redirect('/auth/login?returnTo=/perfil');
    redirect('/');
  }

  return (
    <section className="w-full flex justify-center items-center">
      <div className="w-full lg:max-w-[50rem]">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
          <div className="rounded-t bg-white border-b border-gray-200 mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-xl md:text-2xl font-bold">
                Mi cuenta
              </h6>
              <button className="bg-slate-800 text-white active:bg-slate-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                Guardar
              </button>
            </div>
          </div>
          <div className="flex-auto px-6 pb-4 pt-0">
            <form>
              <h6 className="text-sm md:text-base mt-3 mb-6 font-bold uppercase">
                Informacion del usuario
              </h6>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10">

                <div className="w-full">
                  <div className="relative w-full mb-3">
                    <label className="block text-xs md:text-base font-bold mb-2" htmlFor="grid-password">
                      Correo electronico
                    </label>
                    <input type="email" className="border-0 px-3 py-3 bg-white rounded text-sm md:text-base shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={user.email} />
                  </div>
                </div>
                <div className="w-full">
                  <div className="relative w-full mb-3">
                    <label className="block text-xs md:text-base font-bold mb-2" htmlFor="grid-password">
                      Nombres
                    </label>
                    <input type="text" className="border-0 px-3 py-3 bg-white rounded text-sm md:text-base shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={user.firstName} />
                  </div>
                </div>
                <div className="w-full">
                  <div className="relative w-full mb-3">
                    <label className="block text-xs md:text-base font-bold mb-2" htmlFor="grid-password">
                      Apellidos
                    </label>
                    <input type="text" className="border-0 px-3 py-3 bg-white rounded text-sm md:text-base shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={user.lastName} />
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-b-1" />

              <h6 className=" text-sm md:text-base mt-3 mb-6 font-bold uppercase">
                Informacion de contacto
              </h6>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10">
                <div className="w-full md:col-span-2 lg:col-span-3">
                  <div className="relative w-full mb-3">
                    <label className="block text-xs md:text-base font-bold mb-2" htmlFor="grid-password">
                      Direccion
                    </label>
                    <input type="text" className="border-0 px-3 py-3 bg-white rounded text-sm md:text-base shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={user.address} />
                  </div>
                </div>
                <div className="w-full">
                  <div className="relative w-full mb-3">
                    <label className="block text-xs md:text-base font-bold mb-2" htmlFor="grid-password">
                      Ciudad
                    </label>
                    <input type="email" className="border-0 px-3 py-3 bg-white rounded text-sm md:text-base shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={user.city} />
                  </div>
                </div>
                <div className="w-full">
                  <div className="relative w-full mb-3">
                    <label className="block text-xs md:text-base font-bold mb-2" htmlFor="grid-password">
                      Pais
                    </label>
                    <input type="text" className="border-0 px-3 py-3 bg-white rounded text-sm md:text-base shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={user.country} />
                  </div>
                </div>
                <div className="w-full">
                  <div className="relative w-full mb-3">
                    <label className="block text-xs md:text-base font-bold mb-2" htmlFor="grid-password">
                      Codigo postal
                    </label>
                    <input type="text" className="border-0 px-3 py-3 bg-white rounded text-sm md:text-base shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={user.zipCode} />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}