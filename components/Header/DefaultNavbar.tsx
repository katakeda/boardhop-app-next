import { ChevronRightIcon, MenuIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Action, useAuthContext } from '../../contexts/AuthContext';
import { logout as logoutRequest } from '../../utils/user';

interface DefaultNavbarProps { }

export const DefaultNavbar: React.FC<DefaultNavbarProps> = () => {
  const router = useRouter();
  const isLoggedIn = useAuthContext((value) => value.state.isLoggedIn);
  const dispatch = useAuthContext((value) => value.dispatch);
  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleMenu = () => setMobileMenu((prev) => !prev);

  const logout = async () => {
    if (await logoutRequest()) {
      dispatch({ type: Action.SET_USER, payload: null });
      router.push('/user/login');
    }
  }

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
          {isLoggedIn && (
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/posts" passHref><a className="py-2 px-3 border-2 border-green-600 bg-green-600 text-white hover:bg-green-50 hover:text-green-600 rounded-full transform duration-500">出品する</a></Link>
              <button className="py-5 px-3" onClick={logout}>ログアウト</button>
            </div>
          )}
          {!isLoggedIn && (
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/user/login" passHref><a className="py-5 px-3">ログイン</a></Link>
              <Link href="/user/signup" passHref><a className="py-5 px-3">会員登録</a></Link>
            </div>
          )}
          <div className="md:hidden"></div>
        </div>
      </div>
      {mobileMenu && (
        <div className="md:hidden">
          {isLoggedIn && (
            <>
              <Link href="/posts" passHref>
                <a className="flex justify-between py-5 px-3">出品する<ChevronRightIcon className="h-6 w-6" /></a>
              </Link>
              <span className="flex justify-between py-5 px-3" onClick={logout}>
                ログアウト
                <ChevronRightIcon className="h-6 w-6" />
              </span>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Link href="/user/login" passHref>
                <a className="flex justify-between py-5 px-3">ログイン<ChevronRightIcon className="h-6 w-6" /></a>
              </Link>
              <Link href="/user/signup" passHref>
                <a className="flex justify-between py-5 px-3">会員登録<ChevronRightIcon className="h-6 w-6" /></a>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}