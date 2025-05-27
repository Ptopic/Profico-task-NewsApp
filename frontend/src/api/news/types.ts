export interface IArticleResponse {
   totalResults: number;
   articles: IArticle[];
}

export interface IArticle {
   author: string;
   title: string;
   url: string;
   urlToImage: string;
   publishedAt: string;
   dateAddedToFavourites: Date;
   source: {
      name: string;
   };
}
