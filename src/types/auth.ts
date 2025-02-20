
export interface AuthUser {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

export interface Session {
  user: AuthUser | null;
  expires_at: number;
}

export interface AuthResponse {
  data: {
    user: AuthUser | null;
    session?: Session | null;
  };
  error?: string;
}
