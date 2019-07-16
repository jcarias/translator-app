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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";

const buildHeaderRow = (locales, handleDeleteClick) =>
  locales.map((locale, key) => (
    <TableCell key={key}>
      <Grid container alignItems="center">
        <Grid item>{locale}</Grid>
        <Grid item>
          <IconButton onClick={() => handleDeleteClick(locale)} size="small">
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Grid>
      </Grid>
    </TableCell>
  ));

const buildTranslationsRow = (
  localizationKey,
  index,
  locales,
  localizationDataLabel,
  classes,
  showConfirmDeleteRow
) => (
  <TableRow hover key={index}>
    <TableCell variant="body" nowrap="nowrap">
      <Typography noWrap color="textSecondary">
        <em>{localizationKey}</em>
      </Typography>
    </TableCell>
    {locales.map((locale, index) => (
      <TableCell key={index}>{localizationDataLabel[locale]}</TableCell>
    ))}
    <TableCell>
      <IconButton size="small">
        <EditIcon fontSize="inherit" />
      </IconButton>

      <IconButton
        size="small"
        onClick={() => showConfirmDeleteRow(localizationKey)}
        className={classes.destructiveBtn}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </TableCell>
  </TableRow>
);

const useStyles = makeStyles(theme => ({
  destructiveBtn: {
    color: theme.palette.error.main
  }
}));

const LocalizationTable = props => {
  const classes = useStyles();

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
            (localizationKey, index) =>
              buildTranslationsRow(
                localizationKey,
                index,
                props.data.locales,
                props.data.localizationData[localizationKey],
                classes,
                props.showConfirmDeleteRow
              )
          )}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    data: state
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocalizationTable);
