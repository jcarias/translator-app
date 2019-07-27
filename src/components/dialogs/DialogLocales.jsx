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
  AppBar,
  Paper,
  ListItem,
  List,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction
} from "@material-ui/core";
import LocalesList from "./LocalesList";
import actions from "../../modules/actions";

const CurrentLocales = props => {
  const { locales } = props;
  return (
    <List>
      {locales.map(locale => (
        <ListItem divider key={locale.i}>
          <ListItemIcon color={"red"}>
            <Icon icon={ICONS.GLOBE} size={32} />
          </ListItemIcon>
          <ListItemText
            primary={`${locale.l} (${locale.c})`}
            secondary={locale.i}
          />
          <ListItemSecondaryAction>
            <IconButton onClick={() => props.deleteLocale(locale)}>
              <Icon icon={ICONS["TRASH-2"]} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

const styles = {
  dialogContent: {
    height: "calc(100vh - 245px)"
  }
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
    const { open, handleClose, title, content, actions, ...rest } = this.props;
    return (
      <BaseDialog
        open={open}
        handleClose={handleClose}
        title={"Manage Locales"}
        fullWidth
        maxWidth={"md"}
        content={
          <div style={styles.dialogContent}>
            <Tabs
              value={this.state.selTab}
              onChange={this.handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Locales" icon={<Icon icon={ICONS.GLOBE} />} />
              <Tab label="Search" icon={<Icon icon={ICONS.SEARCH} />} />
            </Tabs>
            <Divider />

            <div style={{ padding: 16 }}>
              {this.state.selTab === 0 && (
                <React.Fragment>
                  <Typography paragraph variant="subtitle1">
                    List of locales in use:
                  </Typography>
                  <CurrentLocales
                    locales={this.props.locales}
                    deleteLocale={this.props.deleteLocale}
                  />
                </React.Fragment>
              )}

              {this.state.selTab === 1 && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Search locales to add"
                      placeholder="type the code, country or langage name"
                      name="searchTerm"
                      fullWidth
                      onChange={this.handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="search"
                              onClick={this.searchLocales}
                              disabled={
                                this.state.searchTerm.length < 3 ||
                                this.state.searching
                              }
                            >
                              <Icon icon={ICONS.SEARCH} />
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
