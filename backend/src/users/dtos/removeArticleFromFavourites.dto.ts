import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveArticleFromFavouritesDto {
	@IsString()
	@IsNotEmpty()
	url: string;
}
