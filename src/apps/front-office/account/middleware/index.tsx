import { navigateTo } from "@mongez/react-router";
import user from "apps/front-office/account/user";
import URLS from "apps/front-office/utils/urls";
import { resetPasswordAtom } from "../atoms";

/**
 * Use this middleware if the page requires the user to be logged in
 */
export function Guardian() {
  if (!user.isLoggedIn() || user.isGuest()) {
    return navigateTo(URLS.auth.login);
  }
}

/**
 * Use this middleware if you want to redirect the user to the home page if he/she is logged in
 */
export function ReverseGuardian() {
  if (user.isLoggedIn() && !user.isGuest()) {
    return navigateTo(URLS.home);
  }
}

/**
 * Use this middleware if the forget password and reset password are in two different routes
 * This should check if the user has the OTP code in the reset password atom
 * If not then he/she should be redirected to the forget password page
 */
export function hasOTP() {
  if (!resetPasswordAtom.get("code")) {
    return navigateTo(URLS.auth.forgetPassword);
  }
}
