import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddArticleToFavouritesDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	publisher: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	author: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	title: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	url: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	urlToImage: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	publishedAt: string;
}
