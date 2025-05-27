import { COOKIE_NAME } from '@shared/constants/cookies';
import { LOGIN } from '@shared/utils';
import { removeAuthTokens } from '@shared/utils/auth';
import { getCookie } from 'cookies-next';
import { RequestBuilder } from '../requestBuilder';

export class ClientRequestBuilder<T> extends RequestBuilder<T> {
   constructor(url?: string);
   constructor(
      url?: string,
      requestInit?: RequestInit,
      callback?: (requestInit: RequestInit) => Promise<T>
   ) {
      super(url, requestInit, callback);
   }

   public authenticate() {
      const accessToken = getCookie(COOKIE_NAME.ACCESS_TOKEN)?.toString();

      this.requestInit = {
         ...this.requestInit,
         headers: {
            ...this.requestInit?.headers,
            Authorization: `Bearer ${accessToken}`,
         },
      };

      return this;
   }

   async handleErrors(
      error: any,
      url: string,
      requestInit: RequestInit
   ): Promise<T> {
      if (error instanceof Error) {
         const errorCause = (error as Error).cause as { status: number };
         if (errorCause?.status === 401) {
            await removeAuthTokens();
            window.location.href = LOGIN;
         }
      }
      throw error;
   }
}
