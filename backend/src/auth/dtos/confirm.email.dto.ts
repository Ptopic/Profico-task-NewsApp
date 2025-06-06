import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmEmailPayloadDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	token: string;
}
