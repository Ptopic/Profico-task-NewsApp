export interface IArticleResponse {
   totalResults: number;
   articles: IArticle[];
}

export interface IArticle {
   id: number;
   author: string;
   title: string;
   url: string;
   urlToImage: string;
   publishedAt: string;
   dateAddedToFavourites: Date;
   source: {
      name: string;
   };
   publisher?: string;
}
