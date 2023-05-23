import { AuthLogin } from ".";

export interface AuthRegister extends AuthLogin {
  displayName: string;
}
