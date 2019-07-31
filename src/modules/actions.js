// types of action
const Types = {
  ADD_LOCALE: "ADD_LOCALE",
  REMOVE_LOCALE: "REMOVE_LOCALE",
  UPDATE_LOCALE: "UPDATE_LOCALE",
  IMPORT_FILE: "IMPORT_FILE",
  EXPORT_LOCALE_DATA: "EXPORT_LOCALE_DATA",
  ADD_LOCALIZED_STRING: "ADD_LOCALIZED_STRING",
  TOGGLE_LOCALE: "TOGGLE_LOCALE",
  REMOVE_LOCALIZED_STRING: "REMOVE_LOCALIZED_STRING",
  ADD_TRANSLATED_STRINGS: "ADD_TRANSLATED_STRINGS"
};

// actions
const addLocale = locale => ({
  type: Types.ADD_LOCALE,
  locale
});

const removeLocale = locale => {
  console.log(locale);
  return {
    type: Types.REMOVE_LOCALE,
    locale
  };
};

const updateLocale = (oldLocale, newLocale) => ({
  type: Types.UPDATE_LOCALE,
  oldLocale,
  newLocale
});

const toggleLocale = (currentLocales, locale) => {
  if (currentLocales.some(l => l.i === locale.i)) {
    //Locale exists: Remove it
    return {
      type: Types.REMOVE_LOCALE,
      locale
    };
  } else {
    //Locale doesn't exist: Add it
    return {
      type: Types.ADD_LOCALE,
      locale
    };
  }
};

const importFile = (locale, localizationStrings) => ({
  type: Types.IMPORT_FILE,
  locale,
  localizationStrings
});

const exportLocaleData = locale => ({
  type: Types.EXPORT_LOCALE_DATA,
  locale
});

const addLocalizedString = (key, localizedValues) => ({
  type: Types.ADD_LOCALIZED_STRING,
  key,
  localizedValues
});

const removeLocalizedString = key => ({
  type: Types.REMOVE_LOCALIZED_STRING,
  key
});

const addTranslatedStrings = (locale, localizationStrings) => ({
  type: Types.ADD_TRANSLATED_STRINGS,
  locale,
  localizationStrings
});

export default {
  addLocale,
  removeLocale,
  updateLocale,
  importFile,
  exportLocaleData,
  addLocalizedString,
  removeLocalizedString,
  Types,
  toggleLocale,
  addTranslatedStrings
};
