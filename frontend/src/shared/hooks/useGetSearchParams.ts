import { useSearchParams } from 'next/navigation';

export const useGetSearchParams = (searchParam: string) => {
  const searchParams = useSearchParams();
  return searchParams.get(searchParam);
};
