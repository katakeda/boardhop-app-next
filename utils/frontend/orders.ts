import { Order } from '../../types/common';
import { ORDERS_API_ENDPOINT } from '../constants';

export const getOrders = async (): Promise<{
  orders: Array<Order> | null;
  error: any;
}> => {
  try {
    const options = { method: 'GET' };
    const response = await fetch(ORDERS_API_ENDPOINT, options);

    if (response.status == 404) {
      return {
        orders: [],
        error: null,
      };
    }

    if (response.status >= 300) {
      return {
        orders: null,
        error: response.statusText,
      };
    }

    const data = await response.json();

    return {
      orders: data.orders,
      error: null,
    };
  } catch (error) {
    return {
      orders: null,
      error: 'Failed to get orders',
    };
  }
};

export const getOrder = async (
  id: string | Array<string> | undefined
): Promise<{
  order: Order | null;
  error: any;
}> => {
  if (typeof id !== 'string') {
    id = '';
  }

  try {
    const options = { method: 'GET' };
    const response = await fetch(`${ORDERS_API_ENDPOINT}/${id}`, options);

    if (response.status >= 300) {
      return {
        order: null,
        error: response.statusText,
      };
    }

    const data = await response.json();

    return {
      order: data.order,
      error: null,
    };
  } catch (error) {
    return {
      order: null,
      error: 'Failed to get order',
    };
  }
};
