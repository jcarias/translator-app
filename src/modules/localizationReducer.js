import ACTIONS from "./actions";
import _ from "lodash";

const defaultState = {
  locales: ["en-US"],
  localizationData: {}
};

const todoReducer = (state = defaultState, action) => {
  console.log(action);
  switch (action.type) {
    case ACTIONS.Types.ADD_LOCALE: {
      let newState = _.cloneDeep(state);
      let newLocale = action.locale;
      return addLocale(newLocale, newState);
    }

    case ACTIONS.Types.REMOVE_LOCALE: {
      let newState = _.cloneDeep(state);
      const localeToDelete = action.locale;
      newState.locales = newState.locales.filter(
        locale => locale !== localeToDelete
      );

      //update localization data
      if (!_.isEmpty(newState.localizationData)) {
        for (const key in newState.localizationData) {
          if (newState.localizationData.hasOwnProperty(key)) {
            let localization = newState.localizationData[key];
            delete localization[localeToDelete];
          }
        }
      }
      return newState;
    }

    case ACTIONS.Types.IMPORT_FILE: {
      let newState = _.cloneDeep(state);
      console.log(action);
      if (newState.locales.indexOf(action.locale) < 0) {
        newState = addLocale(action.locale, newState);
      }
      for (const key in action.localizationStrings) {
        if (action.localizationStrings.hasOwnProperty(key)) {
          const localizationString = action.localizationStrings[key];
          newState.localizationData[key] = {
            ...newState.localizationData[key],
            [action.locale]: localizationString
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
  if (stateData.locales.indexOf(locale) < 0) {
    //update locales array
    stateData.locales.push(locale);
    //update localization data
    if (!_.isEmpty(stateData.localizationData)) {
      for (const key in stateData.localizationData) {
        if (stateData.localizationData.hasOwnProperty(key)) {
          let localization = stateData.localizationData[key];
          localization = { ...localization, [locale]: null };
        }
      }
    }
  }

  return stateData;
};

export default todoReducer;
