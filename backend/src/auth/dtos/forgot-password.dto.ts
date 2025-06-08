import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordPayloadDto {
	@ApiProperty()
	@IsEmail()
	@IsString()
	@IsNotEmpty()
	email: string;
}
