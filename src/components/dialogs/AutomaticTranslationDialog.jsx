import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LinearProgress from "@material-ui/core/LinearProgress";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import isNil from "lodash/isNil";
import Typography from "@material-ui/core/Typography";

import actions from "../../modules/actions";
import { translate } from "../../utils/constants/translator";
import Icon from "../utils/Icon";
import { ICONS } from "../../utils/constants/icons";
import { IconButton, Divider } from "@material-ui/core";

class AutomaticTranslationDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceLocale: {},
      targetLocale: {},
      overwriteExisting: false,
      loading: false,
      progress: 0,
      translatingKey: "",
      generatedData: { locale: {}, localizationStrings: {} }
    };
  }

  handleChange = ev => {
    if (ev && ev.target) this.setState({ [ev.target.name]: ev.target.value });
  };

  handleCheckChange = event => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  };

  isReadyToTranslate = () => {
    const { sourceLocale, targetLocale, loading } = this.state;
    const ready =
      !loading &&
      !isEmpty(sourceLocale) &&
      !isEmpty(targetLocale) &&
      !isEqual(sourceLocale, targetLocale);

    return ready;
  };

  getTranslations = () => {
    this.setState({
      loading: true,
      generatedData: {
        localizationStrings: {},
        locale: this.state.targetLocale
      }
    });
    const { translations } = this.props;
    const sourceLanguage = this.state.sourceLocale.lc;
    const targetLanguage = this.state.targetLocale.lc;

    let count = 0;
    let total = Object.keys(translations).length;

    Object.keys(translations).forEach(async key => {
      if (
        isNil(translations[key][this.state.sourceLocale.i]) ||
        isEmpty(translations[key][this.state.sourceLocale.i]) ||
        (!isNil(translations[key][this.state.targetLocale.i]) &&
          !isEmpty(translations[key][this.state.targetLocale.i]) &&
          !this.state.overwriteExisting)
      ) {
        //Skip if target translation exists and  overwrite is not set
        count++;
        this.setState({
          translatingKey: key,
          progress: (count * 100) / total,
          loading: count < total
        });
        return;
      }

      await translate(
        sourceLanguage,
        targetLanguage,
        translations[key][this.state.sourceLocale.i]
      ).then(result => {
        count++;
        const translations = {
          ...this.state.generatedData.localizationStrings,
          [key]: result.outputs[0].output
        };
        this.setState({
          translatingKey: key,
          progress: (count * 100) / total,
          loading: count < total,
          generatedData: {
            ...this.state.generatedData,
            localizationStrings: translations
          }
        });
        return console.log(
          this.state.progress,
          this.state.translatingKey,
          result
        );
      });
    });
  };

  render() {
    const { open, handleClose } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
        disableBackdropClick={this.state.loading}
        disableEscapeKeyDown={this.state.loading}
      >
        <DialogTitle id="alert-dialog-title">
          <Grid container spacing={1}>
            <Grid item>
              <Icon icon={ICONS["DOWNLOAD-CLOUD"]} size={32} />
            </Grid>
            <Grid item style={{ flexGrow: 1 }}>
              {"Automatic translations"}
            </Grid>
            <Grid item>
              <IconButton>
                <Icon icon={ICONS["X"]} size={16} />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {
              "Choose the Source and the Target locales and generate translations for each key using the source value. "
            }
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth disabled={this.state.loading}>
                <InputLabel htmlFor="source-locale">Source Locale</InputLabel>
                <Select
                  id="source-locale"
                  name="sourceLocale"
                  value={this.state.sourceLocale}
                  onChange={this.handleChange}
                >
                  {this.props.locales.map((locale, key) => (
                    <MenuItem value={locale} key={key}>{`${locale.i} (${
                      locale.l
                    }:${locale.c})`}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth disabled={this.state.loading}>
                <InputLabel htmlFor="target-locale">Target Locale</InputLabel>
                <Select
                  id="target-locale"
                  name="targetLocale"
                  value={this.state.targetLocale}
                  onChange={this.handleChange}
                >
                  {this.props.locales.map((locale, key) => (
                    <MenuItem value={locale} key={key}>{`${locale.i} (${
                      locale.l
                    }:${locale.c})`}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.overwriteExisting}
                    onChange={this.handleCheckChange}
                    value={this.state.overwriteExisting}
                    color="primary"
                    name="overwriteExisting"
                  />
                }
                label="Overwrite existing translations in the target"
                labelPlacement="start"
                disabled={this.state.loading}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography align="right" component="div">
                <Button
                  color="primary"
                  variant="contained"
                  disabled={!this.isReadyToTranslate()}
                  onClick={this.getTranslations}
                >
                  Translate online
                </Button>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                {this.state.loading
                  ? `Translating key '${this.state.translatingKey}'...`
                  : "Ready"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <LinearProgress
                variant="determinate"
                value={this.state.progress}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                {`Progress ${this.state.progress}%`}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={
              this.state.loading ||
              isEmpty(this.state.generatedData.localizationStrings)
            }
            onClick={() =>
              this.props.importLocalizations(
                this.state.generatedData.locale,
                this.state.generatedData.localizationStrings
              )
            }
          >
            Save generated translations
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    locales: state.locales,
    translations: state.localizationData
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addLocalizedString: (key, localizedValues) => {
      dispatch(actions.addLocalizedString(key, localizedValues));
    },
    importLocalizations: (locale, localizationStrings) =>
      dispatch(actions.importFile(locale, localizationStrings))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutomaticTranslationDialog);
