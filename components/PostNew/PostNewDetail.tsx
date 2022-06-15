import React, { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import { PlusIcon, XCircleIcon } from '@heroicons/react/solid';
import { Result } from '@mapbox/mapbox-gl-geocoder';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Category, PickupLocation, Rate, Tag } from '../../types/common';
import { getCategories } from '../../utils/frontend/categories';
import { RateMap } from '../../utils/constants';
import mapboxgl, {
  DEFAULT_CENTER,
  DEFAULT_STYLE,
  DEFAULT_ZOOM,
  MapboxGlGeocoder,
} from '../../utils/frontend/mapbox';
import { submitPost } from '../../utils/frontend/posts';
import { DefaultError } from '../Common/DefaultError';
import { DefaultLoading } from '../Common/DefaultLoading';
import { DropdownMenu } from '../Common/DropdownMenu';
import { PostNewDetailSnowboard } from './PostNewDetailSnowboard';
import { PostNewDetailSurfboard } from './PostNewDetailSurfboard';

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

interface UploadedImage {
  file: File;
  url: string;
}

const initialValues: FormValues = {
  title: '',
  description: '',
  price: 0,
  rate: Rate.DAY,
};

export const PostNewDetail: React.FC<PostNewDetailProps> = ({
  rootCategory,
  goBack,
}) => {
  const router = useRouter();
  const [images, setImages] = useState<Array<UploadedImage>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<Error | any | unknown>(null);
  const [rateValue, setRateValue] = useState<Rate | string>('');
  const [skillValue, setSkillValue] = useState<Tag>({} as Tag);
  const [brandValue, setBrandValue] = useState<Tag>({} as Tag);
  const [pickupLocation, setPickupLocation] = useState<PickupLocation>(
    {} as PickupLocation
  );
  const [postCategory, setPostCategory] = useState<Category>({} as Category);

  const imageRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current !== null) {
      const map = new mapboxgl.Map({
        container: mapRef.current,
        style: DEFAULT_STYLE,
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
      });

      map.addControl(
        new MapboxGlGeocoder({
          accessToken: mapboxgl.accessToken,
          // @ts-ignore types/mapbox__mapbox-gl-geocoder is not up to date
          mapboxgl: mapboxgl,
          marker: true,
          flyTo: { screenSpeed: 5 },
          placeholder: '検索',
          // @ts-ignore types/mapbox__mapbox-gl-geocoder is not up to date
          proximity: 'ip',
          collapsed: true,
          countries: 'jp',
          language: 'ja',
        }).on('result', ({ result }: { result: Result }) => {
          setPickupLocation({
            latitude: result.center[1],
            longitude: result.center[0],
          });
        })
      );
    }
  }, []);

  useEffect(() => {
    (async () => {
      const { categories, error } = await getCategories();
      if (!error && categories) {
        const category = categories.find((category) => {
          category.value === rootCategory;
        });
        setPostCategory(category ? category : categories[0]);
      }
    })();
  }, [rootCategory]);

  const handleImageUpload = (event: BaseSyntheticEvent) => {
    const currentTarget: HTMLInputElement = event.currentTarget;
    if (
      currentTarget.files &&
      currentTarget.files[0] &&
      images.length < MAX_IMAGES_LENGTH
    ) {
      const file = currentTarget.files[0];
      const image = { file, url: URL.createObjectURL(file) };
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
      const data = {
        title: values.title ?? '',
        description: values.description ?? '',
        price: values.price ?? 0,
        rate: values.rate ?? Rate.DAY,
        pickupLatitude: pickupLocation?.latitude,
        pickupLongitude: pickupLocation?.longitude,
      };

      const payload = new FormData();
      payload.append('data', JSON.stringify(data));
      if (skillValue && skillValue.id) {
        payload.append('tag_ids', skillValue.id);
      }
      if (brandValue && brandValue.id) {
        payload.append('tag_ids', brandValue.id);
      }
      if (postCategory && postCategory.id) {
        payload.append('category_ids', postCategory.id);
      }
      images.forEach((image) => {
        payload.append('images', image.file, image.file.name);
      });

      const { post, error } = await submitPost(payload);
      if (error || !post) {
        setFormError(error);
      } else {
        router.push(`/posts/${post.id}`);
      }
    } catch (error) {
      setFormError(error);
    } finally {
      setLoading(false);
    }
  };

  let PostNewDetailInner;
  switch (rootCategory) {
    case 'surfboard':
      PostNewDetailInner = PostNewDetailSurfboard;
      break;
    case 'snowboard':
      PostNewDetailInner = PostNewDetailSnowboard;
      break;
    default:
      PostNewDetailInner = DefaultError;
      break;
  }

  if (formError) {
    return <DefaultError />;
  }

  if (loading) {
    return <DefaultLoading />;
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
          <PostNewDetailInner
            skillValue={skillValue}
            brandValue={brandValue}
            setSkillValue={setSkillValue}
            setBrandValue={setBrandValue}
          />
          <Field type="hidden" name="skill" value={skillValue.id} />
          <Field type="hidden" name="brand" value={brandValue.id} />
          <div className="flex flex-col my-4 w-full">
            <p className="font-sans mb-2 text-sm text-gray-700">
              デポジット金額
            </p>
            <Field
              type="text"
              name="deposit"
              className="rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none"
            />
          </div>
          <div className="flex flex-col my-4 w-full">
            <p className="font-sans mb-2 text-sm text-gray-700">地域</p>
            <div ref={mapRef} className="w-full h-64 rounded-md shadow-sm" />
            <Field type="hidden" name="location" value={pickupLocation} />
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
                    alt={image.url}
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
