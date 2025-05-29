import {
	Body,
	Controller,
	Delete,
	Get,
	Post,
	Query,
	Req,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuth } from 'src/auth/decorators/jwt-auth.decorator';
import { AddArticleToFavouritesDto } from './dtos/addArticleToFavourites.dto';
import { RemoveArticleFromFavouritesDto } from './dtos/removeArticleFromFavourites.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get('favourites')
	@JwtAuth()
	async getFavourites(
		@Req() req: Request,
		@Query('page') page: string,
		@Query('pageSize') pageSize: string,
		@Query('searchQuery') searchQuery?: string
	) {
		const { favourites, totalFavourites } =
			await this.usersService.getFavourites(
				req.user.id,
				page,
				pageSize,
				searchQuery
			);

		return { data: favourites, totalCount: totalFavourites };
	}

	@Post('favourites')
	@JwtAuth()
	addFavourite(@Req() req: Request, @Body() data: AddArticleToFavouritesDto) {
		return this.usersService.addFavourite(req.user.id, data);
	}

	@Delete('favourites')
	@JwtAuth()
	removeFavourite(
		@Req() req: Request,
		@Body() data: RemoveArticleFromFavouritesDto
	) {
		return this.usersService.removeFavourite(req.user.id, data.url);
	}
}
