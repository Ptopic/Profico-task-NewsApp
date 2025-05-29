'use server';

import { COOKIE_NAME } from '@shared/constants/cookies';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export const getCookie = (name: COOKIE_NAME) => {
   return cookies().get(name)?.value;
};
export const setCookie = (options: ResponseCookie) => {
   cookies().set({
      secure: true,
      sameSite: 'lax',
      ...options,
   });
};

export const removeCookie = (name: COOKIE_NAME) => {
   cookies().delete(name);
};
