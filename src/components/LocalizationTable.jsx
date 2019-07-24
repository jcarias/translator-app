import React from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Grid,
  IconButton,
  Link
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";
import Icon from "./utils/Icon";
import { ICONS } from "../utils/constants/icons";

const buildHeaderRow = (locales, showConfirmRemoveLocale) =>
  locales.map((locale, key) => (
    <TableCell key={key}>
      <Grid container alignItems="center">
        <Grid item>{locale}</Grid>
        <Grid item>
          <IconButton
            onClick={() => showConfirmRemoveLocale(locale)}
            size="small"
          >
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
      <Table style={{ marginBottom: 72 }}>
        <TableHead>
          <TableRow>
            <TableCell>i18N Key</TableCell>
            {!isEmpty(props.data.locales) &&
              buildHeaderRow(props.data.locales, props.showConfirmDeleteLocale)}
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
      {isEmpty(props.data.localizationData) && (
        <Grid
          container
          direction="column"
          alignContent="center"
          alignItems="center"
          style={{ padding: "2em" }}
        >
          <Grid item>
            <Icon icon={ICONS.LANGUAGE} size={250} color={"rgba(0,0,0,0.1)"} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" color="textSecondary">
              No translation keys.
            </Typography>
          </Grid>
          <Typography variant="subtitle2" color="textSecondary">
            <Link
              component="button"
              variant="subtitle2"
              onClick={props.showEditKeyDialog}
            >
              Add keys
            </Link>{" "}
            manually or{" "}
            <Link
              component="button"
              variant="subtitle2"
              onClick={props.showImportDialog}
            >
              import
            </Link>{" "}
            i18N files.
          </Typography>
        </Grid>
      )}
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
