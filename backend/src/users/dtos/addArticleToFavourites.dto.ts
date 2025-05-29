import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddArticleToFavouritesDto {
	@IsString()
	@IsOptional()
	publisher: string;

	@IsString()
	@IsOptional()
	author: string;

	@IsString()
	@IsOptional()
	title: string;

	@IsString()
	@IsNotEmpty()
	url: string;

	@IsString()
	@IsOptional()
	urlToImage: string;

	@IsString()
	@IsOptional()
	publishedAt: string;
}
