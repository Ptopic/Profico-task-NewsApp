import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddArticleToFavouritesDto } from './dtos/addArticleToFavourites.dto';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async getFavourites(
		userId: number,
		page: string,
		pageSize: string,
		searchQuery?: string
	) {
		const favourites = await this.prisma.favouriteArticle.findMany({
			where: {
				userId,
				title: { contains: searchQuery, mode: 'insensitive' },
			},
			skip: (parseInt(page) - 1) * parseInt(pageSize),
			take: parseInt(pageSize),
			orderBy: {
				createdAt: 'desc',
			},
		});

		const totalFavourites = await this.prisma.favouriteArticle.count({
			where: {
				userId,
				title: { contains: searchQuery, mode: 'insensitive' },
			},
		});

		return { favourites, totalFavourites };
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
		console.log(userId, articleUrl);
		return this.prisma.favouriteArticle.deleteMany({
			where: { url: articleUrl, userId },
		});
	}
}
