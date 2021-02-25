import React from 'react'
import { locales } from '../context/Locales'

export function isLocale(tested) {
  const { localesList } = React.useContext(locales)
  localesList.forEach(locale => {
    if(tested === locale) {return true;}
  });
  return false;
}
