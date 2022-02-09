import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { signup } from '../../utils/user';
import { Wrapper } from './Wrapper';

interface SignupProps { }

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}

export const Signup: React.FC<SignupProps> = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<Error | any | unknown>(null);

  // TODO: Validator needs to check for email format, password length, etc
  const validator = (values: FormValues) => {
    const errors: FormErrors = {};
    if (!values.firstName) {
      errors.firstName = '必須';
    }
    if (!values.lastName) {
      errors.lastName = '必須'
    }
    if (!values.email) {
      errors.lastName = '必須'
    }
    if (!values.password) {
      errors.lastName = '必須'
    }

    return errors;
  }

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);

    try {
      const { firstName, lastName, email, password } = values;
      const payload = {
        firstName,
        lastName,
        email,
        password,
      };

      const { user, error } = await signup(payload);
      if (error || !user) {
        setFormError(error ?? new Error('Something went wrong'));
      } else {
        router.push('/user/settings');
      }
    } catch (error) {
      setFormError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Wrapper>
      {formError && (
        <section className="p-2 mb-4 text-center border-2 border-red-500 text-red-500">
          <p>エラーが発生しました</p>
          <p>もう一度お試しください</p>
        </section>
      )}
      <section>
        <p className="text-center text-2xl text-gray-700 font-semibold">新規登録</p>
      </section>
      <section className="flex flex-col mt-7">
        <Formik
          initialValues={initialValues}
          validate={validator}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-4">
                <ErrorMessage className="p-1 text-red-500" name="lastName" component="div" />
                <Field className="py-3 px-3 border-2 border-gray-300 rounded-md focus:outline-none" name="lastName" type="text" placeholder="性" />
                <ErrorMessage className="p-1 text-red-500" name="firstName" component="div" />
                <Field className="py-3 px-3 border-2 border-gray-300 rounded-md focus:outline-none" name="firstName" type="text" placeholder="名" />
                <ErrorMessage className="p-1 text-red-500" name="email" component="div" />
                <Field className="py-3 px-3 border-2 border-gray-300 rounded-md focus:outline-none" name="email" type="text" placeholder="Eメール" />
                <ErrorMessage className="p-1 text-red-500" name="password" component="div" />
                <Field className="py-3 px-3 border-2 border-gray-300 rounded-md focus:outline-none" name="password" type="password" placeholder="パスワード" />
              </div>
              <button
                className="py-3 px-3 border-2 border-green-600 bg-green-600 text-white text-base font-semibold rounded-md focus:outline-none hover:bg-green-50 hover:text-green-600 transform duration-500"
                type="submit"
                disabled={loading}
              >
                登録
              </button>
            </div>
          </Form>
        </Formik>
      </section>
      <section className="mt-4 text-center text-sm">
        <span>既にアカウントをお持ちの方は</span>
        <Link href="/user/login" passHref>
          <a className="py-5 px-2 text-blue-500">こちらへ</a>
        </Link>
      </section>
    </Wrapper>
  );
}