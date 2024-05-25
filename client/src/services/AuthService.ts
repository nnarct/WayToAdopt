// src/services/AuthService.ts
import { useNavigate } from "react-router-dom";
import { AuthContextType, LoginCredentialsType } from "@/assets/types"; // Adjust the import according to your actual context type
import { useAuth } from "@/contexts/AuthContext";
import { loginUrl } from "@/assets/api";

class AuthService {
  // constructor(authContext: AuthContextType) {
  //   this.setAuth = authContext.setAuth;
}

export default AuthService;
