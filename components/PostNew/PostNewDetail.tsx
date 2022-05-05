import React, { BaseSyntheticEvent, useRef, useState } from 'react';
import { PlusIcon, XCircleIcon } from '@heroicons/react/solid';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Rate } from '../../types/common';
import { RateMap } from '../../utils/constants';
import { submitPost } from '../../utils/posts';
import { DropdownMenu } from '../Common/DropdownMenu';
import { PostNewDetailSnowboard } from './PostNewDetailSnowboard';
import { PostNewDetailSurfboard } from './PostNewDetailSurfboard';
import Image from 'next/image';

// TODO: Fetch this value from auth
const USER_ID = '03fa2c7e-37e7-4777-98f6-bbfe06e01dd0';

const MAX_IMAGES_LENGTH = 8;

interface PostNewDetailProps {
  rootCategory: string;
  goBack: () => void;
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

interface UploadedImage extends File {
  url: string;
}

const initialValues: FormValues = {
  title: '',
  description: '',
  price: 0,
  rate: Rate.DAY,
};

const PostNewDetailError = () => (
  <div className="flex flex-col h-full w-full justify-center items-center">
    <span>Oops! Something went wrong...</span>
  </div>
);

const PostNewDetailLoading = () => (
  <div className="flex flex-col bg-gray-900 h-full w-full justify-center items-center">
    <span className="text-white">Loading...</span>
  </div>
);

export const PostNewDetail: React.FC<PostNewDetailProps> = ({
  rootCategory,
  goBack,
}) => {
  const [images, setImages] = useState<Array<UploadedImage>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<Error | any | unknown>(null);
  const [rateValue, setRateValue] = useState<Rate | string>('');

  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: BaseSyntheticEvent) => {
    const currentTarget: HTMLInputElement = event.currentTarget;
    if (
      currentTarget.files &&
      currentTarget.files[0] &&
      images.length < MAX_IMAGES_LENGTH
    ) {
      const file = currentTarget.files[0];
      const image = { ...file, url: URL.createObjectURL(file) };
      setImages((prev) => [...prev, image]);
      event.currentTarget.value = null;
    }
  };

  const handleImageDelete = (image: UploadedImage) => {
    const imagesSet = new Set(images);
    imagesSet.delete(image);
    setImages([...imagesSet]);
  };

  const validator = (values: FormValues) => {
    const errors: FormErrors = {};
    if (!values.title) {
      errors.title = '必須';
    }
    if ((!values.price && values.price !== 0) || values.price < 0) {
      errors.price = '正しい金額をご入力ください';
    }
    if (!values.rate) {
      errors.rate = '正しいレートをご入力ください';
    }

    return errors;
  };

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
  };

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
    return <PostNewDetailError />;
  }

  if (loading) {
    return <PostNewDetailLoading />;
  }

  return (
    <div className="flex flex-col py-2 px-5 w-full">
      <Formik
        initialValues={initialValues}
        validate={validator}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="flex flex-col my-4 w-full">
            <p className="font-sans mb-2 text-sm text-gray-700">タイトル</p>
            <Field
              type="text"
              name="title"
              className="rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none"
            />
            <ErrorMessage
              className="p-1 text-red-500"
              name="title"
              component="div"
            />
          </div>
          <div className="flex flex-col my-4 w-full">
            <p className="font-sans mb-2 text-sm text-gray-700">詳細</p>
            <Field
              as="textarea"
              name="description"
              rows={5}
              className="rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none"
            />
            <ErrorMessage
              className="p-1 text-red-500"
              name="description"
              component="div"
            />
          </div>
          <div className="flex flex-col my-4 w-full">
            <p className="font-sans mb-2 text-sm text-gray-700">値段</p>
            <span className="flex">
              <Field
                type="number"
                name="price"
                className="rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none"
              />
              <span className="p-2">円 /</span>
              <Field type="hidden" name="rate" value={rateValue} />
              <DropdownMenu
                label={
                  rateValue === Rate.DAY
                    ? RateMap.day
                    : rateValue === Rate.HOUR
                    ? RateMap.hour
                    : ''
                }
                items={[
                  { label: RateMap.day, action: () => setRateValue(Rate.DAY) },
                  {
                    label: RateMap.hour,
                    action: () => setRateValue(Rate.HOUR),
                  },
                ]}
              />
            </span>
            <ErrorMessage
              className="p-1 text-red-500"
              name="price"
              component="div"
            />
            <ErrorMessage
              className="p-1 text-red-500"
              name="rate"
              component="div"
            />
          </div>
          <PostNewDetailInner />
          <div className="flex flex-col my-4 w-full">
            <p className="font-sans mb-2 text-sm text-gray-700">デポジット</p>
            <Field
              type="text"
              name="deposit"
              className="rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none"
            />
          </div>
          <div className="flex flex-col my-4 w-full">
            <p className="font-sans mb-2 text-sm text-gray-700">受け渡し場所</p>
            <Field
              type="text"
              name="location"
              className="rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none"
            />
          </div>
          <div className="flex flex-col my-4 w-full">
            <p className="font-sans mb-2 text-sm text-gray-700">
              画像
              <span className="text-gray-400 ml-2">
                ({images.length}/{MAX_IMAGES_LENGTH})
              </span>
            </p>
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div
                  className="aspect-square rounded-lg border-2 border-dashed border-gray-300 relative"
                  key={index}
                >
                  <Image
                    className="rounded-md"
                    src={image.url}
                    alt={image.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  <XCircleIcon
                    className="h-7 w-7 z-50 absolute -top-3 -right-3 rounded-full text-black bg-white"
                    onClick={() => handleImageDelete(image)}
                  />
                </div>
              ))}
              {images.length < MAX_IMAGES_LENGTH && (
                <>
                  <div
                    className="flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:cursor-pointer"
                    onClick={() => imageRef?.current?.click()}
                  >
                    <PlusIcon className="h-5 w-5 text-gray-500" />
                    <p className="font-sans text-sm text-gray-500">追加</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    ref={imageRef}
                    onChange={handleImageUpload}
                  />
                </>
              )}
            </div>
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="w-full p-2 rounded-md shadow-sm text-white bg-primary-500"
              disabled={loading}
            >
              送信
            </button>
          </div>
        </Form>
      </Formik>
      <button
        type="button"
        className="w-full p-2 my-2 rounded-md border shadow-sm text-gray-700 bg-white"
        onClick={goBack}
      >
        戻る
      </button>
    </div>
  );
};
