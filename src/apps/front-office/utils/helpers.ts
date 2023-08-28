import { current } from "@mongez/react";

export const currentLocaleCode = () => current("localeCode");
export const isRTL = () => current("direction") === "rtl";
export const isLTR = () => current("direction") === "ltr";
export const currentDirection = () => current("direction");
