import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { BusinessError } from 'src/exceptions';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateRandomToken } from 'utils/token';
import { LoginPayloadDto } from './dtos/login.dto';
import { RegisterPayloadDto } from './dtos/register.dto';
import { ResetPasswordPayloadDto } from './dtos/reset-password.dto';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
		private emailService: EmailService
	) {}

	async register(payload: RegisterPayloadDto) {
		const existingUser = await this.prisma.user.findUnique({
			where: {
				email: payload.email,
			},
		});

		if (existingUser) {
			throw new BusinessError('User with this email already exists');
		}

		if (payload.password !== payload.confirmPassword) {
			throw new BusinessError('Passwords do not match');
		}

		const newUser = await this.prisma.user.create({
			data: {
				email: payload.email,
				password: await bcrypt.hash(payload.password, 10),
				firstName: payload.firstName,
				lastName: payload.lastName,
			},
		});

		const token = await this.jwtService.signAsync({
			id: newUser.id,
			email: newUser.email,
			isEmailVerified: false,
		});

		const emailConfirmationToken = generateRandomToken(32);
		const emailConfirmationExpiresAt = new Date(Date.now() + 3600000);

		await this.prisma.emailConfirmationRequest.create({
			data: {
				token: emailConfirmationToken,
				expiresAt: emailConfirmationExpiresAt,
				userId: newUser.id,
			},
		});

		await this.emailService.sendEmail(
			newUser.email,
			'Email Confirmation',
			`Click <a href="${process.env.FRONTEND_URL}/confirm-email?verificationToken=${emailConfirmationToken}">here</a> to confirm your email`
		);

		return { token };
	}

	async login(payload: LoginPayloadDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: payload.email,
			},
		});

		if (!user) {
			throw new ForbiddenException('Invalid credentials');
		}

		const passwordMatches = await bcrypt.compare(
			payload.password,
			user.password
		);

		if (!passwordMatches) {
			throw new ForbiddenException('Invalid credentials');
		}

		const token = await this.jwtService.signAsync({
			id: user.id,
			email: user.email,
			isEmailVerified: user.isEmailVerified,
		});

		return { token };
	}

	async forgotPassword(email: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			throw new BusinessError('User with this email does not exist');
		}

		const existingResetPasswordRequest =
			await this.prisma.resetPasswordRequest.findFirst({
				where: {
					email,
				},
			});

		if (existingResetPasswordRequest) {
			throw new BusinessError('A reset password request already exists');
		}

		const token = generateRandomToken(32);
		const expiresAt = new Date(Date.now() + 3600000);

		await this.prisma.resetPasswordRequest.create({
			data: {
				token,
				email: user.email,
				userId: user.id,
				expiresAt,
			},
		});

		await this.emailService.sendEmail(
			user.email,
			'Reset Password',
			`Click <a href="${process.env.FRONTEND_URL}/reset-password?resetPasswordToken=${token}">here</a> to reset your password`
		);

		return { message: 'Reset password email sent' };
	}

	async resetPassword(userId: number, payload: ResetPasswordPayloadDto) {
		const resetPasswordRequest =
			await this.prisma.resetPasswordRequest.findUnique({
				where: {
					userId,
					token: payload.token,
				},
			});

		const user = await this.prisma.user.findUnique({
			where: {
				id: resetPasswordRequest.userId,
			},
		});

		if (!user) {
			throw new BusinessError('User not found');
		}

		const passwordMatches = await bcrypt.compare(
			payload.currentPassword,
			user.password
		);

		if (!passwordMatches) {
			throw new BusinessError('Invalid credentials');
		}

		const newPasswordMatches = await bcrypt.compare(
			payload.newPassword,
			user.password
		);

		if (newPasswordMatches) {
			throw new BusinessError(
				'New password cannot be the same as the current password'
			);
		}

		if (payload.newPassword !== payload.confirmNewPassword) {
			throw new BusinessError('Passwords do not match');
		}

		if (!resetPasswordRequest) {
			throw new BusinessError('Invalid or expired token');
		}

		if (resetPasswordRequest.expiresAt < new Date()) {
			throw new BusinessError('Invalid or expired token');
		}

		await this.prisma.user.update({
			where: { id: user.id },
			data: { password: await bcrypt.hash(payload.newPassword, 10) },
		});

		await this.prisma.resetPasswordRequest.delete({
			where: { id: resetPasswordRequest.id },
		});

		await this.emailService.sendEmail(
			user.email,
			'Password Reset',
			`Your password has been reset`
		);

		return { message: 'Password reset successfully' };
	}

	async confirmEmail(userId: number, token: string) {
		const existingUser = await this.prisma.user.findUnique({
			where: { id: userId },
		});

		if (existingUser.isEmailVerified) {
			throw new BusinessError('Email already verified');
		}

		const emailConfirmationRequest =
			await this.prisma.emailConfirmationRequest.findUnique({
				where: {
					userId,
					token,
				},
			});

		if (!emailConfirmationRequest) {
			throw new BusinessError('Invalid or expired token');
		}

		if (emailConfirmationRequest.expiresAt < new Date()) {
			throw new BusinessError('Token expired');
		}

		await this.prisma.emailConfirmationRequest.delete({
			where: { id: emailConfirmationRequest.id },
		});

		const user = await this.prisma.user.update({
			where: { id: userId },
			data: { isEmailVerified: true },
		});

		await this.emailService.sendEmail(
			user.email,
			'Email Confirmed',
			`Your email has been confirmed`
		);

		return { message: 'Email confirmed successfully' };
	}

	async resendEmailConfirmation(userId: number) {
		const user = await this.prisma.user.findFirst({
			where: {
				id: userId,
			},
		});

		if (!user) {
			throw new BusinessError('User not found');
		}

		if (user.isEmailVerified) {
			throw new BusinessError('Email already verified');
		}

		const token = generateRandomToken(32);
		const expiresAt = new Date(Date.now() + 3600000);

		await this.prisma.emailConfirmationRequest.create({
			data: {
				token,
				expiresAt,
				userId: user.id,
			},
		});

		await this.emailService.sendEmail(
			user.email,
			'Email Confirmation',
			`Click <a href="${process.env.FRONTEND_URL}/confirm-email?verificationToken=${token}">here</a> to confirm your email`
		);

		return { message: 'Email confirmation sent' };
	}

	async getCurrentUser(userId: number) {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
		});

		return user;
	}
}
