import React, { useEffect, useRef, useState } from 'react';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { StripeError } from '@stripe/stripe-js';
import { Post } from '../../types/common';
import { currencyFormat } from '../../utils/common';
import { APP_URL } from '../../utils/constants';
import { DefaultDatePicker } from '../Common/DefaultDatePicker';
import { SpinIcon } from '../Common/SpinIcon';

const getErrorMessage = (error: StripeError): string | null => {
  if (!error) {
    return null;
  }
  switch (error.type) {
    case 'card_error':
    case 'validation_error':
      return 'お支払い情報をご確認の上、再度お試しください';
    default:
      return 'お支払い処理中にエラーが発生しました';
  }
};

export const PostPayment: React.FC<{ post: Post; clientSecret: string }> = ({
  post,
  clientSecret,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [formError, setFormError] = useState<string | null | undefined>(null);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number | null | undefined>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (!stripe || !clientSecret) {
      return;
    }
    (async () => {
      const { paymentIntent } = await stripe.retrievePaymentIntent(
        clientSecret
      );
      setTotal(paymentIntent?.amount);
    })();
  }, [stripe, clientSecret]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    if (!stripe || !elements) {
      return;
    }

    // Update payment intent with any information that was not
    // loaded inside the intent on page load.
    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startDate,
        endDate,
        message: messageRef.current?.value,
      }),
    };
    const response = await fetch(
      `/api/payment/intent/${paymentIntent?.id}`,
      options
    );
    if (response.status >= 300) {
      return;
    }

    // Call stripe payment complete api.
    // We will make backend call to update our db
    // after successful redirect to return_url.
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${APP_URL}/api/payment/complete`,
      },
    });

    setFormError(getErrorMessage(error));
    setFormLoading(false);
  };

  return (
    <div className="h-full">
      <div className="flex flex-col space-y-8 items-center justify-center">
        <div className="flex flex-col w-96 mt-8 shadow-md rounded-md border border-gray-100">
          <div className="p-4 shadow-sm">詳細</div>
          <div className="p-4 shadow-sm">{post?.title}</div>
          <div className="flex justify-between p-4 bg-gray-100">
            <span>合計金額：</span>
            {total ? <span>{currencyFormat(total)}円</span> : <SpinIcon />}
          </div>
        </div>
        <div className="flex w-96">
          <div className="flex flex-col w-1/2">
            <span className="py-4">受取日</span>
            <DefaultDatePicker
              onChange={(date: Date) => setStartDate(date)}
              selected={startDate}
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              selectsStart
            />
          </div>
          <div className="flex flex-col w-1/2">
            <span className="py-4">返却日</span>
            <DefaultDatePicker
              onChange={(date: Date) => setEndDate(date)}
              selected={endDate}
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              selectsEnd
            />
          </div>
        </div>
        <div className="flex flex-col w-96">
          <div className="py-4">投稿者にメッセージ</div>
          <textarea
            className="p-4 rounded-md shadow-md focus:outline-none border border-gray-100"
            rows={5}
            ref={messageRef}
          />
        </div>
        <div className="flex flex-col w-96">
          <div className="py-4">お支払い方法</div>
          {formError && (
            <div className="text-red-500 p-4 text-center">{formError}</div>
          )}
          <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button
              type="submit"
              className="inline-flex items-center justify-center w-full p-2 mt-3 rounded-md shadow-sm text-white bg-primary-500 disabled:opacity-50"
              disabled={formLoading}
            >
              {formLoading && <SpinIcon />}
              <span>お支払いを完了</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
