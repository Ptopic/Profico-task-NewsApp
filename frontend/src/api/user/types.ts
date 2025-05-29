export interface IFavouritesResponse {
   totalFavourites: number;
   favourites: IFavouriteArticle[];
}

export interface IFavouriteArticle {
   articleId: number;
   publisher: string;
   author: string;
   title: string;
   url: string;
   urlToImage: string;
   publishedAt: string;
   createdAt: string;
   updatedAt: string;
}

export interface IAddArticleToFavouritesPayload {
   publisher: string;
   author: string;
   title: string;
   url: string;
   urlToImage: string;
   publishedAt: string;
}

export interface IRemoveArticleFromFavouritesPayload {
   url: string;
}
