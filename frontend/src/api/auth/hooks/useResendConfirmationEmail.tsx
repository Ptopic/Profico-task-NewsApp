import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { authApi } from '../requests';

const useResendConfirmationEmail = (
   options?: UseMutationOptions<any, Error, void, unknown>
) => {
   return useMutation<any, Error, void, unknown>({
      mutationFn: () => authApi.client.resendEmailConfirmation(),
      ...options,
   });
};

export default useResendConfirmationEmail;
