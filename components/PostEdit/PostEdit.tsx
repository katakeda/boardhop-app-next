import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { PlusIcon, XCircleIcon } from '@heroicons/react/solid';
import { Result } from '@mapbox/mapbox-gl-geocoder';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { PickupLocation, Post, Rate, Tag } from '../../types/common';
import { RateMap } from '../../utils/constants';
import mapboxgl, {
  DEFAULT_GLGEOCODER_CONFIG,
  DEFAULT_STYLE,
  DETAILED_ZOOM,
  MapboxGlGeocoder,
} from '../../utils/frontend/mapbox';
import { updatePost } from '../../utils/frontend/posts';
import { DefaultError } from '../Common/DefaultError';
import { DefaultLoading } from '../Common/DefaultLoading';
import { DisabledContainer } from '../Common/DisabledContainer';
import { DropdownMenu } from '../Common/DropdownMenu';
import { PostSnowboardAttributes } from '../Common/PostSnowboardAttributes';
import { PostSurfboardAttributes } from '../Common/PostSurfboardAttributes';

const MAX_IMAGES_LENGTH = 8;
const handleImageDelete = (image: any) => {};
const handleImageUpload = () => {};

interface UploadedImage {
  file: File;
  url: string;
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

export const PostEdit: React.FC<{ post: Post }> = ({ post }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<Error | any | unknown>(null);
  const [images, setImages] = useState<Array<UploadedImage>>([]);
  const [rateValue, setRateValue] = useState<Rate | string>(post.rate);
  const [skillValue, setSkillValue] = useState<Tag>(
    post.tags?.find((t) => t.type === 'Skill Level') ?? ({} as Tag)
  );
  const [brandValue, setBrandValue] = useState<Tag>(
    post.tags?.find((t) =>
      ['Surfboard Brand', 'Snowboard Brand'].includes(t.type)
    ) ?? ({} as Tag)
  );
  const [pickupLocation, setPickupLocation] = useState<PickupLocation>(
    post.pickupLocation
  );

  const imageRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current !== null) {
      const map = new mapboxgl.Map({
        container: mapRef.current,
        center: [pickupLocation.longitude, pickupLocation.latitude],
        style: DEFAULT_STYLE,
        zoom: DETAILED_ZOOM,
      });

      // @ts-ignore types/mapbox__mapbox-gl-geocoder is not up to date
      new MapboxGlGeocoder(DEFAULT_GLGEOCODER_CONFIG)
        .on('result', ({ result }: { result: Result }) => {
          setPickupLocation({
            latitude: result.center[1],
            longitude: result.center[0],
          });
        })
        .addTo(map);

      const marker = new mapboxgl.Marker()
        .setLngLat([pickupLocation.longitude, pickupLocation.latitude])
        .addTo(map);

      map.on('click', (event) => {
        const { lng, lat } = event.lngLat;
        marker.setLngLat([lng, lat]);
        setPickupLocation({ longitude: lng, latitude: lat });
      });
    }
  }, []);

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
        rate: rateValue,
        pickupLatitude: pickupLocation?.latitude,
        pickupLongitude: pickupLocation?.longitude,
      };

      const payload = new FormData();
      payload.append('data', JSON.stringify(data));

      const { post: updatedPost, error } = await updatePost(post.id, payload);
      if (error || !updatedPost) {
        setFormError(error);
      } else {
        router.push(`/posts/${updatedPost.id}`);
      }
    } catch (error) {
      setFormError(error);
    } finally {
      setLoading(false);
    }
  };

  const initialValues: FormValues = {
    title: post.title,
    description: post.description,
    price: post.price,
    rate: post.rate,
  };

  let PostEditInner;
  switch (true) {
    case post.categories?.includes('surfboard'):
      PostEditInner = PostSurfboardAttributes;
      break;
    case post.categories?.includes('snowboard'):
      PostEditInner = PostSnowboardAttributes;
      break;
    default:
      PostEditInner = DefaultError;
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
          <DisabledContainer>
            <PostEditInner
              skillValue={skillValue}
              brandValue={brandValue}
              setSkillValue={setSkillValue}
              setBrandValue={setBrandValue}
            />
          </DisabledContainer>
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
          <DisabledContainer>
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
          </DisabledContainer>
          <div className="w-full">
            <button
              type="submit"
              className="w-full p-2 rounded-md shadow-sm text-white bg-primary-500"
              disabled={loading}
            >
              保存する
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
