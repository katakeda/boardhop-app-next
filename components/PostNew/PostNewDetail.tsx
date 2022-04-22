import React, { BaseSyntheticEvent, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Rate } from '../../types/common';
import { RateMap } from '../../utils/constants';
import { submitPost } from '../../utils/posts';
import { PostNewDetailSnowboard } from './PostNewDetailSnowboard';
import { PostNewDetailSurfboard } from './PostNewDetailSurfboard';

// TODO: Fetch this value from auth
const USER_ID = '03fa2c7e-37e7-4777-98f6-bbfe06e01dd0';

const MAX_IMAGES_LENGTH = 5;

interface PostNewDetailProps {
  rootCategory: string;
}

interface FormValues {
  title?: string;
  description?: string;
  price?: number;
  rate?: Rate;
}

interface FormErrors {
  title?: string;
  description?: string;
  price?: string;
  rate?: string;
}

const initialValues: FormValues = {
  title: '',
  description: '',
  price: 0,
  rate: Rate.DAY,
}

const PostNewDetailError = () => (
  <div className="flex flex-col h-full w-full justify-center items-center">
    <span>Oops! Something went wrong...</span>
  </div>
);

const PostNewDetailLoading = () => (
  <div className="flex flex-col bg-gray-900 h-full w-full justify-center items-center">
    <span className="text-white">Loading...</span>
  </div>
)

export const PostNewDetail: React.FC<PostNewDetailProps> = ({ rootCategory }) => {
  const [images, setImages] = useState<Array<File>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<Error | any | unknown>(null);

  const handleImageUpload = (event: BaseSyntheticEvent) => {
    const currentTarget: HTMLInputElement = event.currentTarget;
    if (currentTarget.files && currentTarget.files[0] && images.length < MAX_IMAGES_LENGTH) {
      const file: File = currentTarget.files[0];
      setImages((prev) => [...prev, file]);
      event.currentTarget.value = null;
    }
  }

  const validator = (values: FormValues) => {
    const errors: FormErrors = {};
    if (!values.title) {
      errors.title = '必須';
    }
    if (!values.description) {
      errors.description = '必須'
    }
    if ((!values.price && values.price !== 0) || values.price < 0) {
      errors.price = '正しい金額をご入力ください';
    }
    if (!values.rate) {
      errors.rate = '正しいレートをご入力ください'
    }

    return errors;
  }

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);

    try {
      const imageData = new FormData();
      for (const key in images) {
        imageData.append(`image_${key}`, images[key], images[key].name);
      }
      const data = {
        userId: USER_ID,
        title: values.title ?? '',
        description: values.description ?? '',
        price: values.price ?? 0,
        rate: values.rate ?? Rate.DAY,
        imageData,
      };
      const { post, error } = await submitPost(data);
      if (error) {
        setFormError(error);
      }
    } catch (error) {
      setFormError(error);
    } finally {
      setLoading(false);
    }
  }

  let PostNewDetailInner: React.FC;

  switch (rootCategory) {
    case 'surfboard':
      PostNewDetailInner = PostNewDetailSurfboard;
      break;
    case 'snowboard':
      PostNewDetailInner = PostNewDetailSnowboard;
      break;
    default:
      PostNewDetailInner = PostNewDetailError;
      break;
  }

  if (formError) {
    return <PostNewDetailError />
  }

  if (loading) {
    return <PostNewDetailLoading />
  }

  return (
    <div className="flex flex-col space-y-6 py-2 px-4 w-full">
      <Formik
        initialValues={initialValues}
        validate={validator}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="flex flex-col w-full">
            <p>タイトル</p>
            <Field type="text" name="title" className="rounded-md shadow-md p-2" />
            <ErrorMessage className="p-1 text-red-500" name="title" component="div" />
          </div>
          <div className="flex flex-col w-full">
            <p>詳細</p>
            <Field as="textarea" name="description" rows={5} className="rounded-md shadow-md p-2" />
            <ErrorMessage className="p-1 text-red-500" name="description" component="div" />
          </div>
          <div className="flex flex-col w-full">
            <p>値段</p>
            <span className="flex">
              <Field type="number" name="price" className="rounded-md shadow-md p-2" />
              <span className="p-2">円 /</span>
              <Field as="select" name="rate" className="p-2">
                <option value={Rate.DAY}>{RateMap.day}</option>
                <option value={Rate.HOUR}>{RateMap.hour}</option>
              </Field>
            </span>
            <ErrorMessage className="p-1 text-red-500" name="price" component="div" />
            <ErrorMessage className="p-1 text-red-500" name="rate" component="div" />
          </div>
          <PostNewDetailInner />
          <div className="flex flex-col w-full">
            <p>デポジット</p>
            <Field type="text" name="deposit" className="rounded-md shadow-md p-2" />
          </div>
          <div className="flex flex-col w-full">
            <p>受け渡し場所</p>
            <Field type="text" name="location" className="rounded-md shadow-md p-2" />
          </div>
          <div className="flex flex-col w-full">
            <p>画像</p>
            {images.map((image, index) => (
              <div key={index}>
                {image.name}
              </div>
            ))}
            <input type="file" onChange={handleImageUpload} />
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="w-full p-2 rounded-md text-white bg-black"
              disabled={loading}
            >送信</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}