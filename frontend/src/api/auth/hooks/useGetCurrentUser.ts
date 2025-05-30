import { CURRENT_USER } from '@shared/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { authApi } from '../requests';
import { IUser } from '../types';

const useGetCurrentUser = () =>
   useQuery<IUser>({
      queryKey: [CURRENT_USER],
      queryFn: authApi.client.getCurrentUser,
   });

export default useGetCurrentUser;
