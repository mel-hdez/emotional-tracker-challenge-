import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

// API URL
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050/api';

// Get token from cookies
export const getToken = () => {
  return Cookie.get('token');
};

// Set token to cookies
export const setToken = (token) => {
  Cookie.set('token', token);
};

// Remove token from cookies
export const removeToken = () => {
  Cookie.remove('token');
};

// Redirect user based on authentication status
export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    const router = useRouter();
    router.push(location);
  }
};

export const validateEmail = (email) => {
  return email.includes('@');
};