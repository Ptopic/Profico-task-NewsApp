import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { authApi } from '../requests';
import { IAuthResponse, ILoginPayload } from '../types';

const useLogin = (
   options?: UseMutationOptions<IAuthResponse, Error, ILoginPayload, unknown>
) => {
   return useMutation<IAuthResponse, Error, ILoginPayload, unknown>({
      mutationFn: (data: ILoginPayload) => authApi.client.login(data),
      ...options,
   });
};

export default useLogin;
