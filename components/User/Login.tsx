import Link from 'next/link';
import React from 'react';
import { Wrapper } from './Wrapper';

interface LoginProps { }

export const Login: React.FC<LoginProps> = () => {
  return (
    <Wrapper>
      <section>
        <p className="text-center text-2xl text-gray-700 font-semibold">ログイン</p>
      </section>
      <section className="flex flex-col mt-7">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-4">
            <input className="py-3 px-3 border-2 border-gray-300 rounded-md focus:outline-none" type="text" placeholder="Eメール" />
            <input className="py-3 px-3 border-2 border-gray-300 rounded-md focus:outline-none" type="password" placeholder="パスワード" />
          </div>
          <button
            className="py-3 px-3 border-2 border-green-600 bg-green-600 text-white text-base font-semibold rounded-md focus:outline-none hover:bg-green-50 hover:text-green-600 transform duration-500"
            onClick={() => {}}>
            Login
          </button>
        </div>
      </section>
      <section className="mt-4 text-center">
        <Link href="/user/signup" passHref>
          <a className="text-sm text-blue-500">新規アカウントを作成する</a>
        </Link>
      </section>
    </Wrapper>
  );
}