import axios from "axios";
import AuthService from "./AuthService";
import { UserProfileType } from "@/assets/types";

class UserService {
  userId = AuthService.getUserId();
  async getUserPosts(): Promise<string[]> {
    try {
      const response = await axios.get(`/api/users/${this.userId}/posts`);
      return response.data.map((post: any) => post.id);
    } catch (error) {
      console.error("Error fetching user posts:", error);
      return [];
    }
  }

  async getUserProfile(): Promise<UserProfileType> {
    try {
      const response = await axios.get(`/api/users/${this.userId}/profile`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }
}

export default new UserService();
