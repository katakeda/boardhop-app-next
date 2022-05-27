import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Action, useAuthContext } from '../../contexts/AuthContext';
import { login } from '../../utils/user';
import { Wrapper } from './Wrapper';

interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
};

export const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useAuthContext((value) => value.dispatch);
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<Error | any | unknown>(null);

  // TODO: Validator needs to check for email format, password length, etc
  const validator = (values: FormValues) => {
    const errors: FormErrors = {};
    if (!values.email) {
      errors.email = '必須';
    }
    if (!values.password) {
      errors.password = '必須';
    }

    return errors;
  };

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);

    try {
      const { email, password } = values;
      const payload = { email, password };

      const { user, error, redirectUrl } = await login(payload);

      if (error || !user) {
        setFormError(error ?? new Error('Something went wrong'));
      } else {
        dispatch({ type: Action.SET_USER, payload: user });
        router.push(redirectUrl ?? '/user/dashboard');
      }
    } catch (error) {
      setFormError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      {formError && (
        <section className="p-2 mb-4 text-center border-2 border-red-500 text-red-500">
          <p>エラーが発生しました</p>
          <p>もう一度お試しください</p>
        </section>
      )}
      <section>
        <p className="text-center text-2xl text-gray-700 font-sans font-semibold">
          ログイン
        </p>
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
                <ErrorMessage
                  className="p-1 text-red-500"
                  name="email"
                  component="div"
                />
                <Field
                  className="py-3 px-3 border-2 border-gray-300 rounded-md focus:outline-none"
                  name="email"
                  type="text"
                  placeholder="Eメール"
                />
                <ErrorMessage
                  className="p-1 text-red-500"
                  name="password"
                  component="div"
                />
                <Field
                  className="py-3 px-3 border-2 border-gray-300 rounded-md focus:outline-none"
                  name="password"
                  type="password"
                  placeholder="パスワード"
                />
              </div>
              <button
                className="w-full p-3 rounded-md shadow-sm text-white bg-primary-500"
                type="submit"
                disabled={loading}
              >
                ログイン
              </button>
            </div>
          </Form>
        </Formik>
      </section>
      <section className="mt-4 text-center">
        <Link href="/user/signup" passHref>
          <a className="text-sm text-blue-500">新規アカウントを作成する</a>
        </Link>
      </section>
    </Wrapper>
  );
};
