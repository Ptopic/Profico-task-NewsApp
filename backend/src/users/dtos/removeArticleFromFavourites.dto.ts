import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveArticleFromFavouritesDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	url: string;
}
