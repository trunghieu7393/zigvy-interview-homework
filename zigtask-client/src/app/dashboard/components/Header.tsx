'use client'

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import CreateTaskModal from './CreateTaskModal'
import SyncTask from './SyncTask'

export default function Header() {
  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/'
    window.location.href = '/'
  }

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <h1 className="text-xl font-bold">Task Dashboard</h1>

      <div className="flex items-center">
          <CreateTaskModal />
          <SyncTask />

        <Menu as="div" className="relative inline-block text-left ml-4">
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none">
            👤 User
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } group flex w-full items-center rounded px-2 py-2 text-sm`}
                    >
                      Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } group flex w-full items-center rounded px-2 py-2 text-sm`}
                    >
                      Upgrade Plan
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } group flex w-full items-center rounded px-2 py-2 text-sm`}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  )
}