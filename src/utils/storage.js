import { INITIAL_ORDERS } from '../data/initialOrders';

const STORAGE_KEY = 'sainy_couture_orders_v7'; // bumped to v7 for removed fabricMeterage from Material Check

export const getStoredOrders = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ORDERS;
  } catch (error) {
    console.error('Failed to parse orders from localStorage', error);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
    return INITIAL_ORDERS;
  }
};

export const saveOrdersToStorage = (orders) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error('Failed to save orders to localStorage', error);
  }
};

export const generateNextOrderId = (orders) => {
  let highestNum = 1000;
  orders.forEach(order => {
    const match = order.id.match(/SG-(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > highestNum) highestNum = num;
    }
  });
  const nextNum = highestNum + 1;
  return `SG-${nextNum}`;
};
