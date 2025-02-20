
// This file provides a basic HTTP client for FastAPI integration
const API_BASE_URL = 'http://localhost:8000'; // Change this to your FastAPI server URL

interface APIResponse<T = any> {
  data?: T;
  error?: string;
  ok: boolean;
  url?: string;
}

export const client = {
  async get(endpoint: string): Promise<APIResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      const data = await response.json();
      return {
        data,
        ok: response.ok
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error',
        ok: false
      };
    }
  },

  async post(endpoint: string, data: any): Promise<APIResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return {
        data: responseData,
        ok: response.ok,
        url: responseData.url
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error',
        ok: false
      };
    }
  },

  async put(endpoint: string, data: any): Promise<APIResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return {
        data: responseData,
        ok: response.ok
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error',
        ok: false
      };
    }
  },

  async delete(endpoint: string): Promise<APIResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return {
        data,
        ok: response.ok
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error',
        ok: false
      };
    }
  },
};

// Temporary auth mock (replace this with your auth system)
export const temporaryAuthUser = {
  id: "temp-user-id",
  email: "temp@example.com"
};
