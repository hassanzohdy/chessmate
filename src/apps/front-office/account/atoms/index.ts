import { atom } from "@mongez/react-atom";

export const resetPasswordAtom = atom({
  key: "resetPassword",
  default: {
    code: "",
    email: "",
    phoneNumber: "",
    // Used for sending the verify code to api
    // if valid, then it will be cleared
    // code must be used instead in the reset password
    tempOTP: "",
  },
});
