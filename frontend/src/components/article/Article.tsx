import { IArticle } from '@api/news/types';
import { FavouritesIcon } from '@shared/svgs';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps {
   article: IArticle;
   favouriteArticles: IArticle[];
   setFavouriteArticles: Dispatch<SetStateAction<IArticle[]>>;
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

   const toggleBookmark = (article: IArticle): void => {
      const dateAddedToFavourites = new Date();

      article.dateAddedToFavourites = dateAddedToFavourites;

      const stored = localStorage.getItem('favourites');

      let favourites: IArticle[] = stored ? JSON.parse(stored) : [];

      if (isFavourite(article.url)) {
         favourites = favourites.filter(
            (articleToRemove) => article.url !== articleToRemove.url
         );
      } else {
         favourites = [article, ...favourites];
      }

      localStorage.setItem('favourites', JSON.stringify(favourites));
      setFavouriteArticles(favourites);
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
                  {article.source.name}
               </p>
               <div className='flex flex-row items-start justify-between gap-2'>
                  <p className='line-clamp-2 font-medium leading-5 text-black500'>
                     {article.title}
                  </p>
                  <button
                     className='justify-cente z-30 flex size-[24px] flex-shrink-0 items-center hover:cursor-pointer'
                     onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        toggleBookmark(article);
                     }}
                  >
                     <FavouritesIcon
                        className={twMerge(
                           'fill-none text-gray500/50',
                           isFavourite(article.url) && 'fill-red500 text-red500'
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
