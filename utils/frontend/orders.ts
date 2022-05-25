import { Order } from "../../types/common"
import { ORDERS_API_ENDPOINT } from "../constants";

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