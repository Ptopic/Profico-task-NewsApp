import { DEFAULT_PAGE, PAGE, SEARCH } from '@api/constants';
import { useSearchParams } from 'next/navigation';

const usePaginationParams = () => {
   const searchParams = useSearchParams();

   const currentPage = searchParams.get(PAGE) || DEFAULT_PAGE;
   const searchValue = searchParams.get(SEARCH) || '';

   return { currentPage: +currentPage, searchValue };
};

export default usePaginationParams;
