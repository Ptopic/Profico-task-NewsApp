import { IArticle } from '@api/news/types';
import useAddToFavourites from '@api/user/hooks/useAddToFavourites';
import useRemoveFromFavourites from '@api/user/hooks/useRemoveFromFavourites';
import { IFavouriteArticle } from '@api/user/types';
import AnimatedFavouritesIcon from '@components/animatedFavouritesIcon';
import { toastError, toastSuccess } from '@shared/utils/toast';
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

export default Article;
