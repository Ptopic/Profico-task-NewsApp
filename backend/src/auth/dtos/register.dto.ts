import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterPayloadDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	firstName: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	lastName: string;

	@IsEmail()
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	password: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	confirmPassword: string;
}
