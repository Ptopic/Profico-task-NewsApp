import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmEmailPayloadDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	token: string;
}
