
// This file provides mock data and functions for the disconnected backend
export const temporaryAuthUser = {
  id: "temp-user-id",
  email: "temp@example.com"
};

export const mockApiCall = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};

// Mock database functions
export const mockDatabase = {
  async fetchData() {
    return [];
  },
  async insertData(data: any) {
    console.log('Mock inserting data:', data);
    return { data, success: true };
  },
  async updateData(data: any) {
    console.log('Mock updating data:', data);
    return { data, success: true };
  },
  async deleteData(id: string) {
    console.log('Mock deleting data:', id);
    return { success: true };
  }
};

// Mock auth functions
export const mockAuth = {
  user: temporaryAuthUser,
  session: null,
  signIn: async () => ({ user: temporaryAuthUser, session: null }),
  signOut: async () => ({ error: null }),
  onAuthStateChange: (callback: Function) => {
    callback('SIGNED_IN', { user: temporaryAuthUser });
    return { unsubscribe: () => {} };
  }
};

// Export a mock client that resembles the original Supabase structure
export const client = {
  from: (table: string) => ({
    select: () => mockDatabase,
    insert: (data: any) => mockDatabase.insertData(data),
    update: (data: any) => mockDatabase.updateData(data),
    delete: () => mockDatabase.deleteData,
  }),
  auth: mockAuth,
  storage: {
    from: (bucket: string) => ({
      upload: async (path: string, file: File) => {
        console.log('Mock uploading file:', { bucket, path, file });
        return { data: { path }, error: null };
      },
      getPublicUrl: (path: string) => ({ 
        data: { publicUrl: `https://mock-storage.com/${path}` }
      }),
    }),
  },
};

// Add this line to maintain compatibility with existing imports
export const supabase = client;
