import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import { QUERY_PARAM } from '@shared/constants/query';

export interface IQueryParams {
  key: QUERY_PARAM;
  value: string | number | undefined;
}

const createQueryString = (
  newParams: Record<string, string | undefined>,
  searchParams?: ReadonlyURLSearchParams
) => {
  const params = new URLSearchParams(searchParams?.toString());

  Object.keys(newParams).forEach(
    (key) => newParams[key] && params.set(key, newParams[key] as string)
  );
  return params.toString();
};

const useUpsertQueryParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const upsertQueryParams = (queryParams: IQueryParams[]) => {
    const previousParams = Object.fromEntries(searchParams);

    queryParams.forEach(({ key, value }) => {
      if (!value) {
        delete previousParams[key as string];
      } else {
        previousParams[key as string] = encodeURIComponent(value);
      }
    });

    Object.keys(previousParams).forEach((key) => {
      if (!previousParams[key]) {
        delete previousParams[key];
      }
    });

    router.replace(`?${createQueryString(previousParams)}`, { scroll: false });
  };

  return { upsertQueryParams };
};

export default useUpsertQueryParams;
