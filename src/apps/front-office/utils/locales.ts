import { groupedTranslations, trans } from "@mongez/localization";
import mainTranslation from "shared/localization/index.json";

groupedTranslations(mainTranslation);

// useful for Arabic language, if not needed you can remove it
export function the(key: string) {
  return trans("the", { key: trans(key) });
}

// Add only common localization
groupedTranslations();
