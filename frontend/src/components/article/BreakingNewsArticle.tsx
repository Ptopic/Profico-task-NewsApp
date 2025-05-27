import { IArticle } from '@api/news/types';
import Link from 'next/link';

interface IProps {
   article: IArticle;
}

const BreakingNewsArticle = ({ article }: IProps) => {
   return (
      <Link
         href={article.url}
         target='_blank'
         className='flex h-[300px] w-full flex-col items-center justify-center rounded-lg bg-black600 hover:cursor-pointer'
         style={{ boxShadow: '0px 1px 2px -1px #c8cad1' }}
      >
         <div className='flex h-full w-[281px] flex-col items-center justify-center break-words'>
            <div className='flex h-[17px] w-[73px] flex-row items-center justify-center bg-red500'>
               <p className='text-[10px] font-black uppercase leading-[16px] text-white500'>
                  Breaking
               </p>
            </div>
            <p className='text-center text-[25px] font-black leading-[29px] text-white500'>
               {article.title}
            </p>
            <p className='text-white700 text-[12px] leading-none'>
               {article.author}
            </p>
         </div>
      </Link>
   );
};

export default BreakingNewsArticle;
