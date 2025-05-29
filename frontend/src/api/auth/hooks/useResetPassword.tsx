import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { authApi } from '../requests';
import { IResetPasswordPayload } from '../types';

const useResetPassword = (
   options?: UseMutationOptions<any, Error, IResetPasswordPayload, unknown>
) => {
   return useMutation<any, Error, IResetPasswordPayload, unknown>({
      mutationFn: (data: IResetPasswordPayload) =>
         authApi.client.resetPassword(data),
      ...options,
   });
};

export default useResetPassword;
