import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

export interface DropdownMenuProps {
  label: string;
  items: DropdownMenuItem[];
}

export interface DropdownMenuItem {
  label: string;
  action: () => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, items }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <>
        <Menu.Button className="inline-flex justify-center px-4 py-2 w-full rounded-md border border-gray-300 shadow-sm bg-white font-medium text-sm text-gray-700">
          {label}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {items.map((item: DropdownMenuItem) => (
              <Menu.Item key={item.label}>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={item.action}
                    className={active
                      ? "block px-4 py-2 w-full text-sm bg-gray-100 text-gray-900"
                      : "block px-4 py-2 w-full text-sm text-gray-700"
                    }
                  >
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}