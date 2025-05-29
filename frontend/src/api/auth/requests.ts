import { ICallableRequestBuilder } from '@api/requestBuilder/types';

import {
   withAuthenticatedClientRequest,
   withClientRequest,
} from '@api/requestBuilder/client/withClientRequest';
import {
   withAuthenticatedServerRequest,
   withServerRequest,
} from '@api/requestBuilder/server/withServerRequest';
import config from '@shared/config';
import {
   IAuthResponse,
   IConfirmEmailPayload,
   IForgotPasswordPayload,
   ILoginPayload,
   IRegisterPayload,
   IResetPasswordPayload,
   IUser,
} from './types';

export const getCurrentUser =
   (request: ICallableRequestBuilder<IUser>) => async () =>
      request.call(`${config.apiUrl}/auth/me`);

export const register =
   (request: ICallableRequestBuilder<IAuthResponse>) =>
   (registerData: IRegisterPayload) =>
      request.call(`${config.apiUrl}/auth/register`, (init) => ({
         ...init,
         method: 'POST',
         headers: {
            ...init.headers,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(registerData),
      }));

export const login =
   (request: ICallableRequestBuilder<IAuthResponse>) =>
   (loginData: ILoginPayload) =>
      request.call(`${config.apiUrl}/auth/login`, (init) => ({
         ...init,
         method: 'POST',
         headers: {
            ...init.headers,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(loginData),
      }));

export const forgotPassword =
   (request: ICallableRequestBuilder<any>) =>
   (forgotPasswordData: IForgotPasswordPayload) =>
      request.call(`${config.apiUrl}/auth/forgot-password`, (init) => ({
         ...init,
         method: 'POST',
         headers: {
            ...init.headers,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(forgotPasswordData),
      }));

export const resetPassword =
   (request: ICallableRequestBuilder<any>) =>
   (resetPasswordData: IResetPasswordPayload) =>
      request.call(`${config.apiUrl}/auth/reset-password`, (init) => ({
         ...init,
         method: 'POST',
         headers: {
            ...init.headers,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(resetPasswordData),
      }));

export const confirmEmail =
   (request: ICallableRequestBuilder<any>) =>
   (confirmEmailData: IConfirmEmailPayload) =>
      request.call(`${config.apiUrl}/auth/confirm-email`, (init) => ({
         ...init,
         method: 'POST',
         headers: {
            ...init.headers,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(confirmEmailData),
      }));

export const resendEmailConfirmation =
   (request: ICallableRequestBuilder<any>) => () =>
      request.call(
         `${config.apiUrl}/auth/resend-email-confirmation`,
         (init) => ({
            ...init,
            method: 'POST',
            headers: {
               ...init.headers,
               'Content-Type': 'application/json',
            },
         })
      );

export const authApi = {
   client: {
      getCurrentUser: withAuthenticatedClientRequest(getCurrentUser),
      register: withClientRequest(register),
      login: withClientRequest(login),
      forgotPassword: withClientRequest(forgotPassword),
      resetPassword: withAuthenticatedClientRequest(resetPassword),
      confirmEmail: withAuthenticatedClientRequest(confirmEmail),
      resendEmailConfirmation: withAuthenticatedClientRequest(
         resendEmailConfirmation
      ),
   },
   server: {
      getCurrentUser: withAuthenticatedServerRequest(getCurrentUser),
      register: withServerRequest(register),
      login: withServerRequest(login),
      forgotPassword: withServerRequest(forgotPassword),
      resetPassword: withAuthenticatedServerRequest(resetPassword),
      confirmEmail: withAuthenticatedServerRequest(confirmEmail),
      resendEmailConfirmation: withAuthenticatedServerRequest(
         resendEmailConfirmation
      ),
   },
};
