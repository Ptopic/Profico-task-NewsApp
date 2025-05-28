'use client';
import Toast from '@components/toast/Toast';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { IToastPayload } from '@interfaces';

import { TOAST_VARIANT } from '@components/toast/toastStyle';

import { DEFAULT_ERROR_MESSAGE } from '@shared/constants';

export const toastSuccess = ({ title, description, id }: IToastPayload) =>
   toast(<Toast title={title} description={description} />, {
      toastId: id || 'toast-success',
   });

export const toastError = ({
   title = DEFAULT_ERROR_MESSAGE,
   description,
}: IToastPayload) =>
   toast(
      <Toast
         title={title}
         description={description}
         variant={TOAST_VARIANT.ERROR}
      />,
      { toastId: 'error-toast' }
   );
