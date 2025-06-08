import {
	Body,
	Controller,
	Delete,
	Get,
	Post,
	Query,
	Req,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
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
	@ApiQuery({ name: 'search', required: false })
	async getFavourites(@Req() req: Request, @Query('search') search: string) {
		return await this.usersService.getFavourites(req.user.id, search);
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
