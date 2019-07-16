// types of action
const Types = {
  ADD_LOCALE: "ADD_LOCALE",
  REMOVE_LOCALE: "REMOVE_LOCALE",
  UPDATE_LOCALE: "UPDATE_LOCALE",
  IMPORT_FILE: "IMPORT_FILE",
  EXPORT_LOCALE_DATA: "EXPORT_LOCALE_DATA",
  ADD_LOCALIZED_STRING: "ADD_LOCALIZED_STRING",
  REMOVE_LOCALIZED_STRING: "REMOVE_LOCALIZED_STRING"
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

export default {
  addLocale,
  removeLocale,
  updateLocale,
  importFile,
  exportLocaleData,
  addLocalizedString,
  removeLocalizedString,
  Types
};
