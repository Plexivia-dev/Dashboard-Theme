export interface User {
  id: string;
  did?: string;
  email: string;
  name: string;
  username?: string;
  phone?: string;
  address?: string;
  role: string;
  department?: string;
  designation?: string;
  subRole?: string;
  avatar?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  requires2fa?: boolean;
  twoFactorToken?: string;
  twoFactorEmail?: string;
  allowedMethods?: string[];
  data?: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Verify2faPayload {
  email?: string;
  password?: string;
  code: string;
  twoFactorToken?: string;
  method?: 'authenticator' | 'email_otp';
}
