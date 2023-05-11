import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LanguageSwitcher() {
  const { t } = useTranslation();
  const router = useRouter();
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);

  if (!["en", "ko"].includes(router.locale)) {
    router.replace(router.pathname, router.pathname, { locale: "en" });
  }

  const handleChangeLanguage = async () => {
    // console.log(event.target.value);
    // i18n.changeLanguage(event.target.value);
    await router.push(router.pathname, router.asPath, {
      locale: event.target.value,
    });
  };

  const handleToggleLanguageSelector = () => {
    setShowLanguageSelector(!showLanguageSelector);
  };

  return (
    <div>
      {showLanguageSelector && (
        <select onChange={handleChangeLanguage} value={router.locale}>
          <option value="en">🇺🇸</option>
          <option value="ko">🇰🇷</option>
        </select>
      )}
    </div>
  );
}
