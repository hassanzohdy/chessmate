import {
  EncryptedLocalStorageDriver,
  PlainLocalStorageDriver,
  setCacheConfigurations,
} from "@mongez/cache";
import {
  decrypt,
  encrypt,
  setEncryptionConfigurations,
} from "@mongez/encryption";
import { AES } from "crypto-js";
import { __DEV__, appCode } from "./flags";

// Cache driver
// If the current environment is development, we'll use `PlainLocalStorageDriver` from `@mongez/cache`
// otherwise, we'll use `EncryptedLocalStorageDriver` from `@mongez/cache` to encrypt the cache data
const cacheDriver = __DEV__
  ? new PlainLocalStorageDriver()
  : new EncryptedLocalStorageDriver();

// Encryption configurations
// If you're not going to use any `Encryption` driver from `@mongez/cache` you can remove the encryption configurations
setEncryptionConfigurations({
  key: appCode,
  driver: AES,
});

// Cache configurations
setCacheConfigurations({
  prefix: appCode,
  driver: cacheDriver,
  // remove the following line if you're not going to use any `Encryption` driver from `@mongez/cache`
  encryption: {
    encrypt,
    decrypt,
  },
});
