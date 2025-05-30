import { IArticle } from '@api/news/types';
import useAddToFavourites from '@api/user/hooks/useAddToFavourites';
import useRemoveFromFavourites from '@api/user/hooks/useRemoveFromFavourites';
import { IFavouriteArticle } from '@api/user/types';
import { toastError, toastSuccess } from '@shared/utils/toast';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps {
   article: IArticle;
   favouriteArticles: IFavouriteArticle[];
   setFavouriteArticles: Dispatch<SetStateAction<IFavouriteArticle[]>>;
}

const Article = ({
   article,
   favouriteArticles,
   setFavouriteArticles,
}: IProps) => {
   const [imgLoadingError, setImgLoadingError] = useState(false);

   const isFavourite = (url: string): boolean => {
      return (
         favouriteArticles &&
         favouriteArticles.length > 0 &&
         favouriteArticles.filter((article) => {
            return url == article.url;
         }).length > 0
      );
   };

   const { mutate: addToFavourites } = useAddToFavourites({
      onSuccess: () => {
         setFavouriteArticles([
            article as unknown as IFavouriteArticle,
            ...favouriteArticles,
         ]);

         toastSuccess({
            title: 'Article added to favourites',
         });
      },
      onError: (error) => {
         toastError({
            title: 'Error adding article to favourites',
            description: error.message,
         });
      },
   });

   const { mutate: removeFromFavourites } = useRemoveFromFavourites({
      onSuccess: () => {
         setFavouriteArticles(
            favouriteArticles.filter(
               (favArticle) => favArticle.url !== article.url
            )
         );

         toastSuccess({
            title: 'Article removed from favourites',
         });
      },
      onError: (error) => {
         toastError({
            title: 'Error removing article from favourites',
            description: error.message,
         });
      },
   });

   const toggleBookmark = (article: IArticle): void => {
      if (isFavourite(article.url)) {
         removeFromFavourites({ url: article.url });
      } else {
         addToFavourites({
            publisher: article.source?.name || article.publisher || '',
            author: article.author,
            title: article.title,
            url: article.url,
            urlToImage: article.urlToImage,
            publishedAt: article.publishedAt,
         });
      }
   };

   return (
      <Link
         href={article.url}
         target='_blank'
         className='flex h-[232px] w-full flex-col rounded-lg bg-white500 hover:cursor-pointer lg:h-[252px]'
         style={{ boxShadow: '0px 1px 2px -1px #c8cad1' }}
      >
         {article.urlToImage && !imgLoadingError ? (
            <div className='relative left-0 top-0 h-[140px] w-full overflow-hidden rounded-tl-lg rounded-tr-lg'>
               <Image
                  src={article.urlToImage}
                  alt={article.title}
                  fill
                  className='rounded-tl-lg rounded-tr-lg object-cover'
                  onError={() => setImgLoadingError(true)}
               />
            </div>
         ) : (
            <div className='flex h-[140px] w-full items-center justify-center rounded-tl-lg rounded-tr-lg bg-gray-200'>
               <p className='text-[32px] font-black leading-[100%] text-red500'>
                  My<span className='text-black600'>News</span>
               </p>
            </div>
         )}
         <div className='flex h-[92px] w-full flex-col justify-between p-3 lg:h-[112px]'>
            <div className='flex flex-col gap-1'>
               <p className='text-[10px] font-bold uppercase leading-4 text-blue500'>
                  {article.source?.name || article.publisher}
               </p>
               <div className='flex flex-row items-start justify-between gap-2'>
                  <p className='line-clamp-2 font-medium leading-5 text-black500'>
                     {article.title}
                  </p>
                  <button
                     className='z-30 flex size-[24px] flex-shrink-0 items-center justify-center hover:cursor-pointer'
                     onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        toggleBookmark(article);
                     }}
                  >
                     <AnimatedFavouritesIcon
                        isFilled={isFavourite(article.url)}
                        className={twMerge(
                           'text-gray500/50 transition-colors duration-300',
                           isFavourite(article.url) && 'text-red500'
                        )}
                     />
                  </button>
               </div>
            </div>
            <p className='line-clamp-2 hidden text-[12px] leading-none text-black600 lg:flex'>
               {article.author}
            </p>
         </div>
      </Link>
   );
};

interface Props {
   isFilled: boolean;
   className?: string;
}

const AnimatedFavouritesIcon = ({ isFilled, className }: Props) => {
   return (
      <AnimatePresence mode='wait'>
         <motion.svg
            xmlns='http://www.w3.org/2000/svg'
            width='100%'
            height='100%'
            viewBox='0 0 24 24'
            className={className}
            initial={false}
            animate={{
               scale: isFilled ? [1, 1.2, 1] : 1,
            }}
            transition={{
               duration: 0.3,
            }}
         >
            <motion.path
               d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'
               stroke='currentColor'
               strokeWidth='2'
               strokeLinecap='round'
               strokeLinejoin='round'
               animate={{
                  fill: isFilled ? 'currentColor' : 'transparent',
                  scale: isFilled ? [1, 1.2, 1] : 1,
               }}
               initial={{
                  fill: 'transparent',
                  scale: 1,
               }}
               transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
               }}
            />
         </motion.svg>
      </AnimatePresence>
   );
};

export default Article;
