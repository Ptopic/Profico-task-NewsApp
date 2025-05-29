import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
	constructor(private readonly newsService: NewsService) {}

	@Get('top-headlines')
	async getTopHeadlinesNews(
		@Query('search') search?: string,
		@Query('category') category?: string,
		@Query('page') page: number = 1,
		@Query('pageSize') pageSize: number = 20
	) {
		return this.newsService.getTopHeadlinesNews(
			search,
			category,
			Number(page),
			Number(pageSize)
		);
	}

	@Get('latest')
	async getLatestNews(
		@Query('page') page: number = 1,
		@Query('pageSize') pageSize: number = 20
	) {
		return this.newsService.getLatestNews(Number(page), Number(pageSize));
	}
}
