import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { authApi } from '../requests';
import { IForgotPasswordPayload } from '../types';

const useForgotPassword = (
   options?: UseMutationOptions<any, Error, IForgotPasswordPayload, unknown>
) => {
   return useMutation<any, Error, IForgotPasswordPayload, unknown>({
      mutationFn: (data: IForgotPasswordPayload) =>
         authApi.client.forgotPassword(data),
      ...options,
   });
};

export default useForgotPassword;
