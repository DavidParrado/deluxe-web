import { auth } from "@/auth.config";

export default async function AddressPage() {

  const session = await auth();

  if (!session?.user.id) {
    return (
      <h3 className='text-5xl'>500 - No hay sesion de usuario</h3>
    )
  }

  return (
    <div>
      <h1>Hello Page Address</h1>
    </div>
  )
}