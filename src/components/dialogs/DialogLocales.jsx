import React, { Component } from "react";
import { searchLocale } from "../../utils/constants/i18nData";
import BaseDialog from "./BaseDialog";

import Icon from "../utils/Icon";
import { ICONS } from "../../utils/constants/icons";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import {
  CircularProgress,
  Button,
  Typography,
  Divider
} from "@material-ui/core";
import LocalesList from "./LocalesList";

class DialogLocales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searching: false,
      selectedLocales: [],
      foundLocales: []
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
              <Typography variant="subtitle1">{`Found locales found ${
                this.state.foundLocales.length
              }:`}</Typography>
              <Divider />
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
        }
        actions={
          <Button onClick={handleClose} variant="outlined">
            Close
          </Button>
        }
        {...rest}
      />
    );
  }
}

export default DialogLocales;
