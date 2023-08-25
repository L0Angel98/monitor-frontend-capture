import { useTranslation } from "react-i18next";

export default function ({ file, key }) {
  const { t } = useTranslation(file);
  return t(key);
}
