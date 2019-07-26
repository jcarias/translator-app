import React from "react";
import { connect } from "react-redux";

import Icon from "../utils/Icon";
import { ICONS } from "../../utils/constants/icons";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";
import actions from "../../modules/actions";

const isLocaleBeingUsed = (usedLocales, locale) => {
  const retVal = usedLocales.some(l => l.i === locale.i);
  console.log(retVal, locale);
  return retVal;
};

const LocalesList = props => {
  const { locales, usedLocales, toggleLocale } = props;
  return (
    <List>
      {locales.map((locale, index) => {
        const usedLocale = isLocaleBeingUsed(usedLocales, locale);
        return (
          <ListItem button key={index}>
            <ListItemIcon>
              <Icon icon={ICONS.GLOBE} size={24} />
            </ListItemIcon>
            <ListItemText
              primary={`${locale.l} (${locale.c})`}
              secondary={locale.i}
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={() => toggleLocale(usedLocales, locale)}
                checked={usedLocale}
                inputProps={{
                  "aria-labelledby": "switch-list-label-bluetooth"
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};
const mapStateToProps = (state, ownProps) => {
  return { usedLocales: state.locales };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleLocale: (locales, locale) => {
      dispatch(actions.toggleLocale(locales, locale));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocalesList);
