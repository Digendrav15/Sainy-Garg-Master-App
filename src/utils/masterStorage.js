import { 
  INITIAL_CUSTOMERS, 
  INITIAL_VENDORS, 
  INITIAL_TRANSPORTERS, 
  INITIAL_KARIGARS 
} from '../data/initialMasters';

const CUSTOMERS_KEY = 'sainy_couture_master_customers_v1';
const VENDORS_KEY = 'sainy_couture_master_vendors_v1';
const TRANSPORTERS_KEY = 'sainy_couture_master_transporters_v1';
const KARIGARS_KEY = 'sainy_couture_master_karigars_v1';

// --- CUSTOMERS ---
export const getStoredCustomers = () => {
  try {
    const data = localStorage.getItem(CUSTOMERS_KEY);
    if (!data) {
      localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(INITIAL_CUSTOMERS));
      return INITIAL_CUSTOMERS;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_CUSTOMERS;
  } catch (err) {
    console.error('Error reading customers', err);
    return INITIAL_CUSTOMERS;
  }
};

export const saveCustomersToStorage = (customers) => {
  try {
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
  } catch (err) {
    console.error('Error saving customers', err);
  }
};

// --- VENDORS ---
export const getStoredVendors = () => {
  try {
    const data = localStorage.getItem(VENDORS_KEY);
    if (!data) {
      localStorage.setItem(VENDORS_KEY, JSON.stringify(INITIAL_VENDORS));
      return INITIAL_VENDORS;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_VENDORS;
  } catch (err) {
    console.error('Error reading vendors', err);
    return INITIAL_VENDORS;
  }
};

export const saveVendorsToStorage = (vendors) => {
  try {
    localStorage.setItem(VENDORS_KEY, JSON.stringify(vendors));
  } catch (err) {
    console.error('Error saving vendors', err);
  }
};

// --- TRANSPORTERS ---
export const getStoredTransporters = () => {
  try {
    const data = localStorage.getItem(TRANSPORTERS_KEY);
    if (!data) {
      localStorage.setItem(TRANSPORTERS_KEY, JSON.stringify(INITIAL_TRANSPORTERS));
      return INITIAL_TRANSPORTERS;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_TRANSPORTERS;
  } catch (err) {
    console.error('Error reading transporters', err);
    return INITIAL_TRANSPORTERS;
  }
};

export const saveTransportersToStorage = (transporters) => {
  try {
    localStorage.setItem(TRANSPORTERS_KEY, JSON.stringify(transporters));
  } catch (err) {
    console.error('Error saving transporters', err);
  }
};

// --- KARIGARS ---
export const getStoredKarigars = () => {
  try {
    const data = localStorage.getItem(KARIGARS_KEY);
    if (!data) {
      localStorage.setItem(KARIGARS_KEY, JSON.stringify(INITIAL_KARIGARS));
      return INITIAL_KARIGARS;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_KARIGARS;
  } catch (err) {
    console.error('Error reading karigars', err);
    return INITIAL_KARIGARS;
  }
};

export const saveKarigarsToStorage = (karigars) => {
  try {
    localStorage.setItem(KARIGARS_KEY, JSON.stringify(karigars));
  } catch (err) {
    console.error('Error saving karigars', err);
  }
};

