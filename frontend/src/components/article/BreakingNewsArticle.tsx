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
         className='h-[252px] w-full flex-col items-center justify-center rounded-lg bg-black600 hover:cursor-pointer lg:flex'
         style={{ boxShadow: '0px 1px 2px -1px #c8cad1' }}
      >
         <div className='flex h-full w-full flex-col items-center justify-center gap-2 xl:w-[281px]'>
            <div className='flex h-[17px] w-[73px] flex-row items-center justify-center bg-red500'>
               <p className='text-[10px] font-black uppercase leading-[16px] text-white500'>
                  Breaking
               </p>
            </div>
            <p className='line-clamp-4 w-[80%] break-words text-center text-[25px] font-black leading-[29px] text-white500 xl:w-full'>
               {article.title}
            </p>
            <p className='break-words text-center text-[12px] font-light leading-none text-white700'>
               {article.author}
            </p>
         </div>
      </Link>
   );
};

export default BreakingNewsArticle;
