import { Injectable } from '@nestjs/common';
import { BusinessError } from 'src/exceptions';

@Injectable()
export class NewsService {
	private readonly newsApiBaseUrl = 'https://newsapi.org/v2';

	async getTopHeadlinesNews(
		search?: string,
		category: string = 'general',
		page: number = 1,
		pageSize: number = 20
	) {
		try {
			const params = new URLSearchParams({
				sortBy: 'publishedAt',
				page: page.toString(),
				pageSize: pageSize.toString(),
				apiKey: process.env.NEWS_API_KEY,
				category,
				...(search && { q: search }),
			});

			const url = `${this.newsApiBaseUrl}/top-headlines?${params}`;

			const response = await fetch(url);
			if (!response.ok) {
				throw new BusinessError(response.statusText);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error(`Error fetching top headlines: ${error.message}`);
			throw error;
		}
	}

	async getLatestNews(page: number = 1, pageSize: number = 20) {
		try {
			const today = new Date();
			const yesterday = new Date(today.setDate(today.getDate() - 1));
			const yesterdayDate = yesterday.toISOString().split('T')[0];

			const params = new URLSearchParams({
				sortBy: 'publishedAt',
				page: page.toString(),
				pageSize: pageSize.toString(),
				apiKey: process.env.NEWS_API_KEY,
				from: yesterdayDate,
				to: yesterdayDate,
				sources: 'abc-news,buzzfeed,cbc-news,google-news',
			});

			const url = `${this.newsApiBaseUrl}/everything?${params}`;

			const response = await fetch(url);

			if (!response.ok) {
				throw new BusinessError(response.statusText);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error(`Error fetching latest news: ${error.message}`);
			throw error;
		}
	}
}
