import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { BusinessError } from 'src/exceptions';

@Injectable()
export class EmailService {
	async sendEmail(to: string, subject: string, text: string) {
		const transport = nodemailer.createTransport({
			host: 'smtp.sendgrid.net',
			port: 587,
			auth: {
				user: 'apikey',
				pass: process.env.SENDGRID_API_KEY,
			},
		});

		try {
			await transport.sendMail({
				from: 'notification@petartopic.com',
				to: to,
				subject: subject,
				html: text,
			});
		} catch (error) {
			console.error(error);
			throw new BusinessError('Failed to send email');
		}
	}
}
