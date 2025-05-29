import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { authApi } from '../requests';
import { IConfirmEmailPayload } from '../types';

const useConfirmEmail = (
   options?: UseMutationOptions<any, Error, IConfirmEmailPayload, unknown>
) => {
   return useMutation<any, Error, IConfirmEmailPayload, unknown>({
      mutationFn: (data: IConfirmEmailPayload) =>
         authApi.client.confirmEmail(data),
      ...options,
   });
};

export default useConfirmEmail;
