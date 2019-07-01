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
      //update locales array
      newState.locales = newState.locales.push(newLocale);
      //update localization data
      if (!_.isEmpty(newState.localizationData)) {
        for (const key in newState.localizationData) {
          if (newState.localizationData.hasOwnProperty(key)) {
            let localization = newState.localizationData[key];
            localization = { ...localization, [newLocale]: null };
          }
        }
      }
      return newState;
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
      if (newState.locales.indexOf(action.locale) < 0) {
        newState.locales.push(action.locale);
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
    default:
      return state;
  }
};

export default todoReducer;
