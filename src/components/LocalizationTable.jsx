import React from "react";
import { connect } from "react-redux";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Grid,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Actions from "../modules/actions";
import DialogDeleteKeyConfirm from "./dialogs/DialogDeleteKeyConfirm";

const buildHeaderRow = (locales, handleDeleteClick) =>
  locales.map((locale, key) => (
    <TableCell key={key}>
      <Grid container>
        <Grid item xs>
          {locale}
        </Grid>
        <Grid item>
          <IconButton onClick={() => handleDeleteClick(locale)}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </TableCell>
  ));

const buildTranslationsRow = (locales, localizationDataLabel) => (
  <React.Fragment>
    {locales.map((locale, index) => (
      <TableCell key={index}>{localizationDataLabel[locale]}</TableCell>
    ))}
  </React.Fragment>
);

const LocalizationTable = props => {
  const [openDeleteRowDialog, setOpenDeleteRowDialog] = React.useState(false);
  const [selKey, setSelKey] = React.useState(false);

  const showConfirmDeleteRow = key => {
    setSelKey(key);
    setOpenDeleteRowDialog(true);
  };

  const hideConfirmDeleteRow = () => {
    setOpenDeleteRowDialog(false);
  };

  const deleteKey = key => {
    props.removeLocalizedString(key);
    hideConfirmDeleteRow();
  };

  return (
    <React.Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>i18N Key</TableCell>
            {buildHeaderRow(props.data.locales, props.removeLocale)}
            <TableCell>Tools</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(props.data.localizationData).map(
            (localizationKey, index) => (
              <TableRow key={index} hover>
                <TableCell variant="body" nowrap="nowrap">
                  <Typography noWrap color="textSecondary">
                    <em>{localizationKey}</em>
                  </Typography>
                </TableCell>
                {buildTranslationsRow(
                  props.data.locales,
                  props.data.localizationData[localizationKey]
                )}
                <TableCell>
                  <IconButton
                    onClick={() => showConfirmDeleteRow(localizationKey)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          )}
          <TableRow />
        </TableBody>
      </Table>
      <DialogDeleteKeyConfirm
        open={openDeleteRowDialog}
        localizationKey={selKey}
        handleClose={hideConfirmDeleteRow}
        confirmDeleteKey={deleteKey}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    data: state
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addLocale: locale => dispatch(Actions.addLocale(locale)),
    removeLocale: locale => dispatch(Actions.removeLocale(locale)),
    removeLocalizedString: key => dispatch(Actions.removeLocalizedString(key))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocalizationTable);
