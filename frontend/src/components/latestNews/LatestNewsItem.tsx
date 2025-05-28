import { IArticle } from '@api/news/types';
import { getTimeFromTimestamp } from '@shared/utils/time';
import Link from 'next/link';

interface IProps {
   article: IArticle;
}

const LatestNewsItem = ({ article }: IProps) => {
   return (
      <Link
         href={article.url}
         target='_blank'
         className='flex flex-col gap-2 hover:cursor-pointer'
      >
         <p className='text-[10px] font-bold uppercase leading-4 text-blue500'>
            {getTimeFromTimestamp(article.publishedAt)}
         </p>
         <p className='font-medium leading-5'>{article.title}</p>
      </Link>
   );
};

export default LatestNewsItem;
