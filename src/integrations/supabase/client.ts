// This file is kept as a placeholder for future backend integration
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
