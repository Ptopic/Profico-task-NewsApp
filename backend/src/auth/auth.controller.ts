import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuth } from './decorators/jwt-auth.decorator';
import { ConfirmEmailPayloadDto } from './dtos/confirm.email.dto';
import { ForgotPasswordPayloadDto } from './dtos/forgot-password.dto';
import { LoginPayloadDto } from './dtos/login.dto';
import { RegisterPayloadDto } from './dtos/register.dto';
import { ResetPasswordPayloadDto } from './dtos/reset-password.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('register')
	register(@Body() payload: RegisterPayloadDto) {
		return this.authService.register(payload);
	}

	@Post('login')
	login(@Body() payload: LoginPayloadDto) {
		return this.authService.login(payload);
	}

	@Post('forgot-password')
	forgotPassword(@Body() payload: ForgotPasswordPayloadDto) {
		return this.authService.forgotPassword(payload.email);
	}

	@Post('reset-password')
	@JwtAuth()
	resetPassword(@Req() req: Request, @Body() payload: ResetPasswordPayloadDto) {
		return this.authService.resetPassword(req.user.id, payload);
	}

	@Post('confirm-email')
	@JwtAuth()
	confirmEmail(@Req() req: Request, @Body() payload: ConfirmEmailPayloadDto) {
		return this.authService.confirmEmail(req.user.id, payload.token);
	}

	@Post('resend-email-confirmation')
	@JwtAuth()
	resendEmailConfirmation(@Req() req: Request) {
		return this.authService.resendEmailConfirmation(req.user.id);
	}

	@Get('me')
	@JwtAuth()
	me(@Req() req: Request) {
		return this.authService.getCurrentUser(req.user.id);
	}
}
