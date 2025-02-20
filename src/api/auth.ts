
import { client } from "@/integrations/supabase/client";

export interface AuthUser {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

interface Session {
  user: AuthUser | null;
  expires_at: number;
}

export const auth = {
  async getUser(): Promise<{ data: { user: AuthUser | null }, error?: string }> {
    try {
      const response = await client.get('/api/auth/user');
      return {
        data: { user: response.data || null }
      };
    } catch (error) {
      return {
        data: { user: null },
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  async getSession(): Promise<{ data: { session: Session | null }, error?: string }> {
    try {
      const response = await client.get('/api/auth/session');
      return {
        data: { session: response.data || null }
      };
    } catch (error) {
      return {
        data: { session: null },
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    // For now, we'll just return a dummy subscription object
    // In a real implementation, this would set up WebSocket connection
    return {
      data: {
        subscription: {
          unsubscribe: () => {}
        }
      }
    };
  }
};
