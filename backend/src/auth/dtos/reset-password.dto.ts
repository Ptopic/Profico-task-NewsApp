import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordPayloadDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	currentPassword: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	newPassword: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	confirmNewPassword: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	token: string;
}
