'use server';

import { IAuthResponse } from '@api/auth/types';
import { COOKIE_NAME } from '@shared/constants/cookies';
import { getCookie, removeCookie, setCookie } from './cookie';

export const getAccessToken = async () => {
   return getCookie(COOKIE_NAME.ACCESS_TOKEN);
};

export const setAuthTokens = async (authResponse: IAuthResponse) => {
   setCookie({
      name: COOKIE_NAME.ACCESS_TOKEN,
      value: authResponse.token,
      maxAge: 60 * 60 * 24 * 30,
   });
};

export const removeAuthTokens = async () => {
   await removeAccessTokenForCurrentUser();
};

export const removeAccessTokenForCurrentUser = async () => {
   removeCookie(COOKIE_NAME.ACCESS_TOKEN);
};
