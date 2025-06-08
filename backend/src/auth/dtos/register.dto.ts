import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterPayloadDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	lastName: string;

	@ApiProperty()
	@IsEmail()
	@IsString()
	@IsNotEmpty()
	email: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	password: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	confirmPassword: string;
}
