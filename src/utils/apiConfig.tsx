export const API_BASE_URL = "http://127.0.0.1:8000/api/pension";
export const API_BASE_URL_LOGIN = "http://127.0.0.1:8000/api";
export const IMAGE_BASE_URL = "http://127.0.0.1:8000";
export const API_BASE_PROFILE = "http://127.0.0.1:8000/auth/user";
// export const API_BASE_PROFILE = "http://127.0.0.1:8000/user";

export const API_ENDPOINTS = {
  LOGIN: "/token/",
  REFRESH: "/token/refresh/",
  PRODUCTS: "/products/",
  ROOM_TYPES: "/room-types/",
  ROOMS: "/rooms/",
  GUESTS: "/guests/",
  BOOKINGS: "/bookings/",
  INVOICES: "/invoices/",
  ORDERS: "/orders/",
  PROFILE: "/profile/",
  USER: "/user/",
  PROTECTED: "/protected/",
};

// `${API_BASE_URL}${API_ENDPOINTS.PURCHASE_EXPENSES}${id}`
