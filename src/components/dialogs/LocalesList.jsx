import React from "react";
import { connect } from "react-redux";

import Icon from "../utils/Icon";
import { ICONS } from "../../utils/constants/icons";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import actions from "../../modules/actions";
import { IconButton } from "@material-ui/core";

const isLocaleBeingUsed = (usedLocales, locale) => {
  const retVal = usedLocales.some(l => l.i === locale.i);
  console.log(retVal, locale);
  return retVal;
};

const LocalesList = props => {
  const { locales, usedLocales } = props;
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
              <IconButton
                color="primary"
                onClick={() => props.addLocale(locale)}
                disabled={usedLocale}
              >
                <Icon icon={ICONS.ADD} />
              </IconButton>
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
    addLocale: locale => {
      dispatch(actions.addLocale(locale));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocalesList);
