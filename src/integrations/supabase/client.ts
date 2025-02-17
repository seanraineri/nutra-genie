
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

// Mock database query builder
const createQueryBuilder = () => ({
  select: () => mockDatabase,
  eq: () => mockDatabase,
  insert: (data: any) => mockDatabase.insertData(data),
  update: (data: any) => mockDatabase.updateData(data),
  delete: () => mockDatabase.deleteData,
  order: () => mockDatabase,
});

// Mock database functions
export const mockDatabase = {
  async fetchData() {
    return [];
  },
  async insertData(data: any) {
    console.log('Mock inserting data:', data);
    return { data, error: null };
  },
  async updateData(data: any) {
    console.log('Mock updating data:', data);
    return { data, error: null };
  },
  async deleteData(id: string) {
    console.log('Mock deleting data:', id);
    return { data: null, error: null };
  }
};

// Mock auth functions
export const mockAuth = {
  user: temporaryAuthUser,
  session: { user: temporaryAuthUser },
  getUser: async () => ({ data: { user: temporaryAuthUser }, error: null }),
  getSession: async () => ({ data: { session: null }, error: null }),
  signIn: async () => ({ user: temporaryAuthUser, session: null }),
  signOut: async () => ({ error: null }),
  onAuthStateChange: (callback: Function) => {
    callback('SIGNED_IN', { data: { user: temporaryAuthUser } });
    return { data: { subscription: { unsubscribe: () => {} } }, error: null };
  }
};

// Mock realtime subscription
const mockChannel = {
  on: () => mockChannel,
  subscribe: () => ({ data: {}, error: null })
};

// Export a mock client that resembles the original Supabase structure
export const client = {
  from: (table: string) => ({
    select: () => createQueryBuilder(),
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
  channel: (name: string) => mockChannel,
  removeChannel: (channel: any) => {},
  functions: {
    invoke: async (name: string, { body }: { body: any }) => {
      console.log('Mock function invocation:', { name, body });
      return { data: {}, error: null };
    }
  }
};

// Add this line to maintain compatibility with existing imports
export const supabase = client;
