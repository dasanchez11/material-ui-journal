export type AuthStatus = "not-authenticated" | "checking" | "authenticated";

export interface AuthState {
  status: AuthStatus;
  uuid: string | null;
  displayName: string | null;
  photoUrl: string | null;
  errorMessage: string | null;
}
