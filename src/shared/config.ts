import "./definitions.d.ts";
import "./initial-config";

// keep the previous line to be empty to ignore the import sort as `initial-config` must be imported first
import { ApplicationConfigurations, setAppConfigurations } from "@mongez/react";
import { setHelmetConfigurations } from "@mongez/react-helmet";
import { setRouterConfigurations } from "@mongez/react-router";
import { localeCodesList } from "apps/front-office/utils/localization";
import { defaultLocaleCode, fallbackLocaleCode } from "./flags";
import { routerConfigurations } from "./router-configurations.js";

// @mongez/react-helmet configurations
setHelmetConfigurations({
  appendAppName: true,
  appNameSeparator: " | ",
  translatable: true,
  translateAppName: true,
});

// keep this for the app handling, just change the values
const appConfigurations: ApplicationConfigurations = {
  localization: {
    defaultLocaleCode: defaultLocaleCode,
    fallback: fallbackLocaleCode,
    locales: localeCodesList,
  },
};

// router configurations
setRouterConfigurations(routerConfigurations);

setAppConfigurations(appConfigurations);
