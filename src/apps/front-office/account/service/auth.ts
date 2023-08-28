import endpoint from "shared/endpoint";

/**
 * Get Guest token
 */
export function getGuestToken() {
  return endpoint.post("/login/guests");
}

/**
 * Perform login
 */
export function login(data: any) {
  return endpoint.post("/login", data);
}

/**
 * Create new account
 */
export function register(data: any) {
  return endpoint.post("/register", data);
}

/**
 * Get current user data
 */
export function getMe() {
  return endpoint.get("/me");
}

/**
 * Edit user profile
 */
export function editProfile(data: any) {
  return endpoint.post("/me", data);
}

/**
 * Change password
 */
export function changePassword(data: any) {
  return endpoint.post("/change-password", data);
}

/**
 * Forget password request
 */
export function forgetPassword(data: any) {
  return endpoint.post("/forget-password", data);
}

/**
 * Verify forget password code
 */
export function verifyForgetPassword(data: any) {
  return endpoint.post("/verify-code", data);
}

/**
 * Reset password
 */
export function resetPassword(data: any) {
  return endpoint.post("/reset-password", data);
}

/**
 * Register verification code
 */
export function verifyCode(data: any) {
  return endpoint.post("/register/verify-code", data);
}

/**
 * Login using google
 */
export function loginByGoogle(token: string) {
  return endpoint.post("/login/google", { token });
}

/**
 * Login using facebook
 */
export function loginByFacebook(token: string) {
  return endpoint.post("/login/facebook", { token });
}
