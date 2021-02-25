import { defaultLocale } from '../appConfigs/config'

export function getBrowserLocale() {
  if (typeof sessionStorage === "undefined") return defaultLocale

  const [browserSetting] = navigator.language.split('-')
  return browserSetting
}
