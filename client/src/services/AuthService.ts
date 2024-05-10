class AuthService {

  // Method to log in the user
  async login(email: string, password: string): Promise<boolean> {
    // Here you would typically make an API request to your backend
    // to authenticate the user using the provided credentials.
    // If authentication is successful, return true; otherwise, return false.
    try {
      // Example: Perform API request to authenticate user
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   body: JSON.stringify({ email, password }),
      //   headers: { 'Content-Type': 'application/json' }
      // });
      // const data = await response.json();
      // return data.success;
      const data = { userId: "123" };
      localStorage.setItem("userId", data.userId);
      const userID = this.getUserId();
      console.log({ userID });
      // For demonstration purposes, assuming authentication always succeeds
      return true;
    } catch (error) {
      console.error("Error occurred during login:", error);
      return false;
    }
  }

  // Method to log out the user
  async logout(): Promise<boolean> {
    // Here you would typically make an API request to your backend
    // to invalidate the user's session or perform any necessary cleanup.
    try {
      // Example: Perform API request to logout user

      // For demonstration purposes, simply return without making API request
      localStorage.removeItem("userId");
      console.log("Logged out");
      return true
    } catch (error) {
      console.error("Error occurred during logout:", error);
      return false
    }
  }

  isAuthenticated(): boolean {
    // Check if user ID exists in local storage
    const userId = localStorage.getItem("userId");
    return !!userId; // Return true if user ID exists, false otherwise
  }
  // Other authentication-related methods can be added here

  getUserId(): string | null {
    return localStorage.getItem("userId");
  }
}

export default new AuthService();
