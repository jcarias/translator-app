import React from "react";
import { connect } from "react-redux";

import Icon from "../utils/Icon";
import { ICONS } from "../../utils/constants/icons";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import actions from "../../modules/actions";
import FlagAvatar from "../utils/FlagImage";

const isLocaleBeingUsed = (usedLocales, locale) => {
  const retVal = usedLocales.some(l => l.i === locale.i);
  return retVal;
};

const styles = {
  root: {
    height: "calc(100vh - 430px)",
    overflow: "auto",
    boxShadow: "0 0 1px 0px rgba(0,0,0,0.5)"
  }
};

const LocalesList = props => {
  const { locales, usedLocales } = props;
  return (
    <List style={styles.root} dense>
      {locales.map((locale, index) => {
        const usedLocale = isLocaleBeingUsed(usedLocales, locale);
        return (
          <ListItem divider key={index} disabled={usedLocale}>
            <ListItemAvatar>
              <FlagAvatar countryCode={locale.cc} countryName={locale.c} />
            </ListItemAvatar>
            <ListItemText
              primary={`${locale.l} (${locale.c})`}
              secondary={locale.i}
            />
            {!usedLocale && (
              <ListItemSecondaryAction>
                <IconButton
                  color="primary"
                  onClick={() => props.addLocale(locale)}
                >
                  <Icon icon={ICONS.ADD} />
                </IconButton>
              </ListItemSecondaryAction>
            )}
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
