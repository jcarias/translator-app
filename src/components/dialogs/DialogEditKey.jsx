import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import BaseDialog from "./BaseDialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ACTIONS from "../../modules/actions";

class DialogEditKey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locales: [],
      translationKey: "",
      translations: {}
    };
  }

  generateDefaultTranslations = () => {
    let defaultTranslations = {};
    this.props.locales.forEach(locale => {
      if (
        this.props.translations &&
        this.props.translations.hasOwnProperty(locale.i)
      )
        defaultTranslations[locale.i] = this.props.translations[locale.i];
      else defaultTranslations[locale.i] = "";
    });

    return defaultTranslations;
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      locales: this.props.locales,
      translationKey: this.props.selKey || "",
      translations: this.generateDefaultTranslations(this.props.locales)
    });
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.locales, this.props.locales)) {
      this.setState({
        ...this.state,
        locales: this.props.locales,
        translations: this.generateDefaultTranslations(this.props.locales)
      });
    }

    if (!_.isEqual(prevProps.selKey, this.props.selKey)) {
      this.setState({ ...this.state, translationKey: this.props.selKey });
    }

    if (!_.isEqual(prevProps.translations, this.props.translations)) {
      this.setState({
        ...this.state,
        translations: this.props.translations,
        translationKey: this.props.selKey
      });
    }
  }

  handleKeyChange = evt => {
    console.log(evt);
    if (evt && evt.target) {
      this.setState({ translationKey: evt.target.value });
    }
  };

  handleTranslationChange = (evt, locale) => {
    if (evt && evt.target) {
      this.setState({
        translations: {
          ...this.state.translations,
          [locale.i]: evt.target.value
        }
      });
    }
  };

  handleSubmit = () => {
    this.props.addLocalizedString(
      this.state.translationKey,
      this.state.translations
    );
    this.props.handleClose();
  };

  render() {
    const { open, handleClose } = this.props;
    return (
      <BaseDialog
        open={open}
        handleClose={handleClose}
        title={"Add new translation"}
        content={
          <React.Fragment>
            <TextField
              autoFocus={_.isEmpty(this.state.translationKey)}
              margin="dense"
              id="translationKey"
              name="translationKey"
              label="Translation key"
              type="text"
              value={this.state.translationKey}
              placeholder="my-key"
              fullWidth
              onChange={this.handleKeyChange}
            />
            {this.state.locales.map((locale, index) => (
              <TextField
                key={index}
                autoFocus
                margin="dense"
                id={`value-${locale.i}`}
                name={`value-${locale.i}`}
                label={`Translation for: ${locale.i} (${locale.l})`}
                type="text"
                value={
                  !_.isEmpty(this.state.translations)
                    ? this.state.translations[locale.i]
                    : ""
                }
                fullWidth
                onChange={evt => this.handleTranslationChange(evt, locale)}
              />
            ))}
          </React.Fragment>
        }
        actions={
          <React.Fragment>
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Save translation
            </Button>
          </React.Fragment>
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
    addLocalizedString: (key, localizedValues) => {
      dispatch(ACTIONS.addLocalizedString(key, localizedValues));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogEditKey);
