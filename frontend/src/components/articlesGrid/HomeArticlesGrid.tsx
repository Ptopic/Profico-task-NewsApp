import { IArticle } from '@api/news/types';
import { IFavouriteArticle } from '@api/user/types';
import { Article, BreakingNewsArticle } from '@components/article';
import LatestNews from '@components/latestNews';
import PulsatingDotsSpinner from '@components/pulsatingDotsSpinner';
import { AnimatePresence } from 'framer-motion';
import AnimatedGridItem from './AnimatedGridItem';

interface IProps {
   articles: IArticle[];
   favouriteArticles: IFavouriteArticle[];
   isFetchingNextPage: boolean;
}

const HomeArticlesGrid = ({
   articles,
   favouriteArticles,
   isFetchingNextPage,
}: IProps) => {
   return (
      <div className='grid h-full w-full grid-cols-1 place-items-stretch gap-4 lg:grid-cols-3 lg:gap-6'>
         <div className='h-full w-full flex-shrink-0 lg:col-span-2 lg:row-span-2'>
            <div className='grid h-full w-full flex-shrink-0 grid-cols-1 place-items-center gap-4 lg:grid-cols-2 lg:grid-rows-2 lg:gap-6'>
               <AnimatePresence mode='popLayout'>
                  {articles.slice(0, 3).map((article: IArticle, index) => (
                     <AnimatedGridItem
                        key={article.url}
                        index={index}
                        totalItems={articles.length}
                     >
                        <Article
                           article={article}
                           favouriteArticles={favouriteArticles}
                        />
                     </AnimatedGridItem>
                  ))}
                  {articles.slice(3, 4).map((article: IArticle, index) => (
                     <AnimatedGridItem
                        key={article.url}
                        index={index}
                        totalItems={articles.length}
                     >
                        <BreakingNewsArticle article={article} />
                     </AnimatedGridItem>
                  ))}
               </AnimatePresence>
            </div>
         </div>
         <div className='hidden h-full w-full lg:col-start-3 lg:row-span-2 lg:flex'>
            <div className='h-full w-full'>
               <LatestNews />
            </div>
         </div>
         <div className='h-full w-full lg:col-span-3 lg:row-start-3'>
            <div className='grid h-full w-full place-items-center gap-4 lg:gap-6 lg:[grid-auto-rows:252px] lg:[grid-template-columns:repeat(auto-fill,minmax(320px,1fr))]'>
               <AnimatePresence mode='popLayout'>
                  {articles.slice(4).map((article: IArticle, index) => (
                     <AnimatedGridItem
                        key={article.url}
                        index={index}
                        totalItems={articles.length}
                     >
                        <Article
                           article={article}
                           favouriteArticles={favouriteArticles}
                        />
                     </AnimatedGridItem>
                  ))}
               </AnimatePresence>
            </div>
         </div>
         {isFetchingNextPage && (
            <div className='col-span-full flex w-full justify-center py-4'>
               <PulsatingDotsSpinner colorClassName='bg-red500' />
            </div>
         )}
      </div>
   );
};

export default HomeArticlesGrid;
