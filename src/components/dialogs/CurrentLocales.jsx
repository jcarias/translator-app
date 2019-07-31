import React, { Component } from "react";
import { connect } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import FileSaver from "file-saver";

import IconButton from "@material-ui/core/IconButton";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import Icon from "../utils/Icon";
import { ICONS } from "../../utils/constants/icons";

import DialogConfirmDeleteLocale from "./DialogConfirmDeleteLocale";
import { getLocaleTranslations } from "../../modules/localizationReducer";
import actions from "../../modules/actions";

const styles = {
  dialogContent: {},
  localesList: {
    height: "calc(100vh - 394px)",
    overflow: "auto",
    boxShadow: "0 0 1px 0px rgba(0,0,0,0.5)",
    marginBottom: 16
  }
};

class CurrentLocales extends Component {
  constructor(props) {
    super(props);
    this.state = { deleteLocaleDialogOpen: false, selLocale: null };
  }

  showConfirmDeleteLocale = locale => {
    this.setState({ deleteLocaleDialogOpen: true, selLocale: locale });
  };

  closeConfirmDeleteLocale = () => {
    this.setState({ deleteLocaleDialogOpen: false, selLocale: null });
  };

  confirmDeleteLocale = () => {
    this.props.deleteLocale(cloneDeep(this.state.selLocale));
    this.closeConfirmDeleteLocale();
  };

  downloadLanguage = locale => {
    var blob = new Blob(
      [JSON.stringify(this.props.localizedValues(locale.i), null, 2)],
      { type: "application/json;charset=utf-8" }
    );
    FileSaver.saveAs(blob, `${locale.i}.json`);
  };

  render() {
    const { locales } = this.props;
    return (
      <React.Fragment>
        <DialogConfirmDeleteLocale
          open={this.state.deleteLocaleDialogOpen}
          locale={this.state.selLocale}
          handleClose={this.closeConfirmDeleteLocale}
          confirmDeleteLocale={this.confirmDeleteLocale}
        />
        <List style={styles.localesList}>
          {locales.map(locale => (
            <ListItem divider key={locale.i}>
              <ListItemIcon color={"red"}>
                <Icon icon={ICONS.BOOK} size={32} />
              </ListItemIcon>
              <ListItemText
                primary={`${locale.l} (${locale.c})`}
                secondary={locale.i}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => this.downloadLanguage(locale)}>
                  <Icon icon={ICONS["DOWNLOAD"]} />
                </IconButton>
                <IconButton
                  onClick={() => this.showConfirmDeleteLocale(locale)}
                >
                  <Icon icon={ICONS["TRASH-2"]} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    locales: state.locales,
    localizedValues: locale => getLocaleTranslations(state, locale)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteLocale: locale => {
      dispatch(actions.removeLocale(locale));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentLocales);
