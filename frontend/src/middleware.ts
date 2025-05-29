'use server';

import { authApi } from '@api/auth/requests';
import { IUser } from '@api/auth/types';
import { COOKIE_NAME } from '@shared/constants';
import { getCookie } from '@shared/utils/cookie';
import {
   CONFIRM_EMAIL,
   FORGOT_PASSWORD,
   LOGIN,
   REGISTER,
   VERIFICATION,
} from '@shared/utils/routes';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export async function middleware(request: NextRequest) {
   const accessToken = await getCookie(COOKIE_NAME.ACCESS_TOKEN);
   const { pathname } = request.nextUrl;
   let user = null;

   if (accessToken) {
      try {
         user = await authApi.server.getCurrentUser();
      } catch (e) {
         console.log(e);
      }
   }

   if (user) {
      return handleAuthenticatedRequest(pathname, user, request.url);
   } else {
      return handleUnauthenticatedRequest(pathname, request.url);
   }
}

const handleAuthenticatedRequest = (
   pathname: string,
   user: IUser,
   url: string
) => {
   if (pathname === VERIFICATION) {
      return;
   }

   if (
      user &&
      !user.isEmailVerified &&
      pathname !== '/logout' &&
      pathname !== CONFIRM_EMAIL &&
      !pathname.startsWith('/api/')
   ) {
      return NextResponse.redirect(new URL(VERIFICATION, url));
   }
};

const handleUnauthenticatedRequest = (pathname: string, url: string) => {
   if (
      pathname !== LOGIN &&
      pathname !== REGISTER &&
      pathname !== VERIFICATION &&
      pathname !== FORGOT_PASSWORD
   ) {
      const urlObj = new URL(url);
      const verificationToken = urlObj.searchParams.get('verificationToken');

      const resetPasswordToken = urlObj.searchParams.get('resetPasswordToken');

      const redirectUrl = new URL(LOGIN, url);

      if (verificationToken) {
         redirectUrl.searchParams.set('verificationToken', verificationToken);
      }

      if (resetPasswordToken) {
         redirectUrl.searchParams.set('resetPasswordToken', resetPasswordToken);
      }

      return NextResponse.redirect(redirectUrl);
   }
};
