import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddArticleToFavouritesDto } from './dtos/addArticleToFavourites.dto';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async getFavourites(userId: number, search?: string) {
		return await this.prisma.favouriteArticle.findMany({
			where: {
				userId,
				...(search && {
					title: { contains: search, mode: 'insensitive' },
				}),
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	async addFavourite(userId: number, data: AddArticleToFavouritesDto) {
		return this.prisma.favouriteArticle.create({
			data: {
				...data,
				user: { connect: { id: userId } },
			},
		});
	}

	async removeFavourite(userId: number, articleUrl: string) {
		return this.prisma.favouriteArticle.deleteMany({
			where: { url: articleUrl, userId },
		});
	}
}
