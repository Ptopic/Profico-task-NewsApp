import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { authApi } from '../requests';
import { IAuthResponse, IRegisterPayload } from '../types';

const useRegister = (
   options?: UseMutationOptions<IAuthResponse, Error, IRegisterPayload, unknown>
) => {
   return useMutation<IAuthResponse, Error, IRegisterPayload, unknown>({
      mutationFn: (data: IRegisterPayload) => authApi.client.register(data),
      ...options,
   });
};

export default useRegister;
