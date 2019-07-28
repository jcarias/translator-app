import React, { Component } from "react";
import { connect } from "react-redux";
import { searchLocale } from "../../utils/constants/i18nData";
import BaseDialog from "./BaseDialog";

import Icon from "../utils/Icon";
import { ICONS } from "../../utils/constants/icons";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import {
  CircularProgress,
  Button,
  Typography,
  Divider,
  ListItem,
  List,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction
} from "@material-ui/core";
import LocalesList from "./LocalesList";
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

const CurrentLocales = props => {
  const { locales, deleteLocale } = props;
  return (
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
            <IconButton onClick={() => deleteLocale(locale)}>
              <Icon icon={ICONS["TRASH-2"]} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

class DialogLocales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searching: false,
      selectedLocales: [],
      foundLocales: [],
      selTab: 0
    };
  }

  searchLocales = () => {
    this.setState({ searching: true });
    searchLocale(this.state.searchTerm)
      .then(found => {
        this.setState({ searching: false, foundLocales: found });
      })
      .catch(err => {
        console.error(err);
        this.setState({ searching: false });
      });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      if (this.state.searchTerm.length > 2 && !this.state.searching) {
        this.searchLocales();
      }
    });
  };

  handleTabChange = (event, newValue) => {
    this.setState({ selTab: newValue });
  };

  render() {
    const { open, handleClose } = this.props;
    return (
      <BaseDialog
        open={open}
        handleClose={handleClose}
        title={"Manage Locales"}
        fullWidth
        maxWidth={"md"}
        content={
          <div>
            <Tabs
              value={this.state.selTab}
              onChange={this.handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Locales" icon={<Icon icon={ICONS.BOOK} />} />
              <Tab label="Search" icon={<Icon icon={ICONS.SEARCH} />} />
            </Tabs>
            <Divider />

            <div style={styles.dialogContent}>
              {this.state.selTab === 0 && (
                <React.Fragment>
                  <Typography
                    style={{ marginTop: 16 }}
                    variant="subtitle1"
                    color="textSecondary"
                  >
                    List of locales in use:
                  </Typography>
                  <CurrentLocales
                    locales={this.props.locales}
                    deleteLocale={this.props.removeLocale}
                  />
                </React.Fragment>
              )}

              {this.state.selTab === 1 && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      style={{ marginTop: 16 }}
                      label="Search locales to add"
                      placeholder="type the code, country or langage name"
                      name="searchTerm"
                      fullWidth
                      onChange={this.handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              color="primary"
                              aria-label="search"
                              onClick={this.searchLocales}
                              disabled={
                                this.state.searchTerm.length < 3 ||
                                this.state.searching
                              }
                            >
                              <Icon icon={ICONS.SEARCH} size={16} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    {this.state.searching ? (
                      <CircularProgress />
                    ) : (
                      <LocalesList locales={this.state.foundLocales} />
                    )}
                  </Grid>
                  <Grid item xs={6} />
                </Grid>
              )}
            </div>
          </div>
        }
        actions={
          <Grid container alignItems="center">
            <Grid item xs>
              {this.state.selTab === 0 && (
                <Typography variant="caption">{`There are ${
                  this.props.locales.length
                } locales in use.`}</Typography>
              )}
              {this.state.selTab === 1 && (
                <Typography variant="caption">{`Found locales found ${
                  this.state.foundLocales.length
                }:`}</Typography>
              )}
            </Grid>
            <Grid item>
              <Button onClick={handleClose} variant="outlined">
                Close
              </Button>
            </Grid>
          </Grid>
        }
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    locales: state.locales
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeLocale: locale => {
      dispatch(actions.removeLocale(locale));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogLocales);
