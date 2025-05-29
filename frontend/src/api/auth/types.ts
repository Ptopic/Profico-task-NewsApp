export interface IUser {
   id: number;
   email: string;
   firstName: string;
   lastName: string;
   isEmailVerified: boolean;
}

export interface IRegisterPayload {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   confirmPassword: string;
}

export interface ILoginPayload {
   email: string;
   password: string;
}

export interface IForgotPasswordPayload {
   email: string;
}

export interface IResetPasswordPayload {
   currentPassword: string;
   newPassword: string;
   confirmNewPassword: string;
   token: string;
}

export interface IConfirmEmailPayload {
   token: string;
}

export interface IAuthResponse {
   token: string;
}
