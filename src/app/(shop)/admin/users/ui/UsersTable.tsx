'use client';

import { changeUserRole } from "@/actions";
import { User } from "@/interfaces";

interface Props {
  users: User[];
}

export const UsersTable = ({ users }: Props) => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full overflow-x-auto ">
        <div className="inline-block min-w-full py-2 align-middle">
          <div className="overflow-hidden border border-gray-200 md:rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">

                <tr>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                    Email
                  </th>

                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                    Nombre completo
                  </th>

                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                    Rol
                  </th>

                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {
                  users.map(user => (
                    <tr key={user.id}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {`${user.firstName} ${user.lastName}`}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {user.role}
                      </td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
