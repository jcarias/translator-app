import React, { useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import BaseDialog from "./BaseDialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ACTIONS from "../../modules/actions";
import { CHILD_MESSAGE_INITIALIZE } from "jest-worker/build/types";

function DialogEditKey(props) {
  const { localizationKey, locales, handleClose } = props;
  const [key, setKey] = React.useState("");
  const [translations, setTranslations] = React.useState(() => {
    let tempTranslations = {};
    locales.forEach(locale => {
      tempTranslations[locale] = "";
    });

    return tempTranslations;
  });

  function initState() {
    setKey("");
    let tempTranslations = {};
    locales.forEach(locale => {
      tempTranslations[locale] = "";
    });
    setTranslations(tempTranslations);
  }

  function handleKeyChange(evt) {
    if (evt && evt.target) {
      setKey(evt.target.value);
    }
  }

  function handleTranslationChange(evt, locale) {
    if (evt && evt.target) {
      setTranslations({ ...translations, [locale]: evt.target.value });
    }
  }

  function handleSubmit(ev) {
    console.log(ev);
  }

  return (
    <form onSubmit={e => handleSubmit(e)} id="form">
      <BaseDialog
        open={props.open}
        handleClose={handleClose}
        title={"Add new translation"}
        onEnter={initState}
        content={
          <React.Fragment>
            <TextField
              autoFocus={_.isEmpty(key)}
              margin="dense"
              id="key"
              name="key"
              label="Translation key"
              type="text"
              value={key}
              placeholder="my-key"
              fullWidth
              onChange={handleKeyChange}
            />
            {locales.map((locale, index) => (
              <TextField
                key={index}
                autoFocus
                margin="dense"
                id={`value-${locale}`}
                name={`value-${locale}`}
                label={`Translation for: ${locale}`}
                type="text"
                value={translations[locale]}
                fullWidth
                onChange={evt => handleTranslationChange(evt, locale)}
              />
            ))}
          </React.Fragment>
        }
        actions={
          <React.Fragment>
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>
            <input type="submit" value="Save Translation" />
          </React.Fragment>
        }
      />
    </form>
  );
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
