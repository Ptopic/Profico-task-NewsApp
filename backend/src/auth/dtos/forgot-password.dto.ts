import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordPayloadDto {
	@IsEmail()
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	email: string;
}
