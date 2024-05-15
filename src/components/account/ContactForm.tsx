'use client';

const address = {
  address: 'asdf',
  city: 'asdf',
  country: 'asdf',
  zipCode: 'asdf',
}

export const ContactForm = () => {
  return (
    <form>
      <div className="h-full text-center flex justify-between py-4">
        <h6 className="text-sm md:text-base font-bold uppercase">
          Informacion de contacto
        </h6>
        <button className="bg-slate-800 text-white active:bg-slate-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
          Guardar
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10">
        <div className="w-full md:col-span-2 lg:col-span-3">
          <div className="relative w-full mb-3">
            <label className="block text-xs md:text-base font-bold mb-2">
              Direccion
            </label>
            <input type="text" className="border-0 px-3 py-3 bg-white rounded text-sm md:text-base shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={address.address} />
          </div>
        </div>
        <div className="w-full">
          <div className="relative w-full mb-3">
            <label className="block text-xs md:text-base font-bold mb-2">
              Ciudad
            </label>
            <input type="email" className="border-0 px-3 py-3 bg-white rounded text-sm md:text-base shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={address.city} />
          </div>
        </div>
        <div className="w-full">
          <div className="relative w-full mb-3">
            <label className="block text-xs md:text-base font-bold mb-2">
              Pais
            </label>
            <input type="text" className="border-0 px-3 py-3 bg-white rounded text-sm md:text-base shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={address.country} />
          </div>
        </div>
        <div className="w-full">
          <div className="relative w-full mb-3">
            <label className="block text-xs md:text-base font-bold mb-2">
              Codigo postal
            </label>
            <input type="text" className="border-0 px-3 py-3 bg-white rounded text-sm md:text-base shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={address.zipCode} />
          </div>
        </div>
      </div>
    </form>
  )
}
