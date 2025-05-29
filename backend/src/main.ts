import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { BusinessErrorFilter } from './exceptions/business-error-filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();
	app.useGlobalPipes(new ValidationPipe());

	app.useGlobalFilters(new BusinessErrorFilter());

	const config = new DocumentBuilder()
		.setTitle('Scratch adventures api')
		.setDescription('The API for the Scratch adventures project')
		.addBearerAuth({
			type: 'http',
			scheme: 'bearer',
			in: 'header',
		})
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	console.log(process.env.PORT);

	console.log('Starting server on port', process.env.PORT ?? 8080);

	await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
