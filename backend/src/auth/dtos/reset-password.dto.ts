import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordPayloadDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	currentPassword: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	newPassword: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	confirmNewPassword: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	token: string;
}
