// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedUsers } from '@/actions';

import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';

export default async function UsersPage() {

  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect('/auth/login');
  }

  return (
    <>
      <h1 className="font-bold mb-4">Todas las ordenes - Usuarios</h1>

      <div className="mb-10">
        <UsersTable users={users}/>
      </div>
    </>
  );
}