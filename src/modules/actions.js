// types of action
const Types = {
  ADD_LOCALE: "ADD_LOCALE",
  REMOVE_LOCALE: "REMOVE_LOCALE",
  UPDATE_LOCALE: "UPDATE_LOCALE",
  IMPORT_FILE: "IMPORT_FILE",
  EXPORT_LOCALE_DATA: "EXPORT_LOCALE_DATA",
  ADD_LOCALIZED_STRING: "ADD_LOCALIZED_STRING"
};

// actions
const addLocale = locale => ({
  type: Types.ADD_LOCALE,
  locale
});

// actions
const removeLocale = locale => ({
  type: Types.REMOVE_LOCALE,
  locale
});

const updateLocale = (oldLocale, newLocale) => ({
  type: Types.UPDATE_LOCALE,
  oldLocale,
  newLocale
});

const importFile = (locale, localizationStrings) => ({
  type: Types.IMPORT_FILE,
  locale,
  localizationStrings
});

const exportLocaleData = locale => ({
  type: Types.EXPORT_LOCALE_DATA,
  locale
});

const addLocalizedString = (locale, key, value) => ({
  type: Types.ADD_LOCALIZED_STRING,
  locale,
  key,
  value
});

export default {
  addLocale,
  removeLocale,
  updateLocale,
  importFile,
  exportLocaleData,
  addLocalizedString,
  Types
};
