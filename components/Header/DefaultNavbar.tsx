import { ChevronRightIcon, MenuIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React, { useState } from 'react';

interface DefaultNavbarProps {

}

export const DefaultNavbar: React.FC<DefaultNavbarProps> = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleMenu = () => setMobileMenu((prev) => !prev);

  return (
    <nav className="py-3 md:py-0">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex md:hidden items-center">
            <button className="focus:outline-none" onClick={toggleMenu}>
              <MenuIcon className="h6 w-6" />
            </button>
          </div>
          <div className="md:flex md:space-x-4">
            {/* TODO: Add Boardhop logo */}
            <Link href="/"><a className="py-5 px-3">Boardhop</a></Link>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/login" passHref><a className="py-5 px-3">ログイン</a></Link>
            <Link href="/signup" passHref><a className="py-5 px-3">会員登録</a></Link>
            <Link href="/posts" passHref><a className="py-2 px-3 border-2 border-green-600 bg-green-600 text-white hover:bg-green-50 hover:text-green-600 rounded-full transform duration-500">出品する</a></Link>
          </div>
          <div className="md:hidden"></div>
        </div>
      </div>
      {mobileMenu && (
        <div className="md:hidden">
          <Link href="/posts" passHref>
            <a className="flex justify-between py-5 px-3">出品する<ChevronRightIcon className="h-6 w-6" /></a>
          </Link>
          <Link href="/login" passHref>
            <a className="flex justify-between py-5 px-3">ログイン<ChevronRightIcon className="h-6 w-6" /></a>
          </Link>
          <Link href="/signup" passHref>
            <a className="flex justify-between py-5 px-3">会員登録<ChevronRightIcon className="h-6 w-6" /></a>
          </Link>
        </div>
      )}
    </nav>
  )
}