import ACTIONS from "./actions";
import _ from "lodash";

const defaultState = {
  locales: [],
  localizationData: {}
};

const todoReducer = (state = defaultState, action) => {
  console.log(action);
  switch (action.type) {
    case ACTIONS.Types.ADD_LOCALE: {
      let newState = _.cloneDeep(state);
      return addLocale(action.locale, newState);
    }

    case ACTIONS.Types.REMOVE_LOCALE: {
      let newState = _.cloneDeep(state);
      const localeToDelete = action.locale;
      newState.locales = newState.locales.filter(
        locale => locale.i !== localeToDelete.i
      );

      //update localization data
      if (!_.isEmpty(newState.localizationData)) {
        for (const key in newState.localizationData) {
          if (newState.localizationData.hasOwnProperty(key)) {
            let localization = newState.localizationData[key];
            delete localization[localeToDelete.i];
          }
        }
      }
      return newState;
    }

    case ACTIONS.Types.IMPORT_FILE: {
      let newState = _.cloneDeep(state);

      //addLocale(...) will only add a locale if it doesn't exists.
      newState = addLocale(action.locale, newState);

      for (const key in action.localizationStrings) {
        if (action.localizationStrings.hasOwnProperty(key)) {
          const localizationString = action.localizationStrings[key];
          newState.localizationData[key] = {
            ...newState.localizationData[key],
            [action.locale.i]: localizationString
          };
        }
      }
      return newState;
    }

    case ACTIONS.Types.ADD_TRANSLATED_STRINGS: {
      let newState = _.cloneDeep(state);

      for (const key in action.localizationStrings) {
        if (action.localizationStrings.hasOwnProperty(key)) {
          const localizationString = action.localizationStrings[key];
          newState.localizationData[key] = {
            ...newState.localizationData[key],
            [action.locale.i]: localizationString
          };
        }
      }
      return newState;
    }

    case ACTIONS.Types.REMOVE_LOCALIZED_STRING: {
      let newState = _.cloneDeep(state);
      delete newState.localizationData[action.key];
      return newState;
    }

    case ACTIONS.Types.ADD_LOCALIZED_STRING: {
      let newState = _.cloneDeep(state);
      newState.localizationData[action.key] = action.localizedValues;
      return newState;
    }

    default:
      console.log(action);
      return state;
  }
};

const addLocale = (locale, stateData) => {
  if (!_.isEmpty(locale)) {
    if (!stateData.locales.some(l => l.i === locale.i)) {
      //update locales array
      stateData.locales = [...stateData.locales, locale];

      //update localization data
      if (!_.isEmpty(stateData.localizationData)) {
        for (const key in stateData.localizationData) {
          if (stateData.localizationData.hasOwnProperty(key)) {
            let localization = stateData.localizationData[key];
            localization = { ...localization, [locale.i]: null };
          }
        }
      }
    }
  }

  return stateData;
};

export const getLocaleTranslations = (state, locale) => {
  const keys = Object.keys(state.localizationData);

  let retVal = {};

  keys.forEach(key => {
    retVal[key] = state.localizationData[key][locale];
  });

  return retVal;
};

export default todoReducer;
