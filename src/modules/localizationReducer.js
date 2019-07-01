import ACTIONS from "./actions";
import _ from "lodash";

const defaultState = {
  locales: ["en-EN"],
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

    default:
      return state;
  }
};

export default todoReducer;
