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

import { makeStyles } from "@material-ui/styles";
import Icon from "./utils/Icon";
import { ICONS } from "../utils/constants/icons";
import { translate } from "../utils/constants/translator";

const buildHeaderRow = (locales, showConfirmRemoveLocale) =>
  locales.map((locale, key) => (
    <TableCell key={key}>{`${locale.i} (${locale.l}: ${locale.c})`}</TableCell>
  ));

const findTranslation = (key, locale) => {
  const source = "en";
  const target = locale.lc;
  const text = key["en-US"];
  translate(source, target, text)
    .then(result => console.log(result.outputs["0"].output))
    .catch(err => console.error(err));
};

const buildTranslationsRow = (
  localizationKey,
  index,
  locales,
  localizationDataLabel,
  classes,
  showConfirmDeleteRow,
  showEditKeyDialog
) => (
  <TableRow hover key={index}>
    <TableCell variant="body" nowrap="nowrap">
      <Typography noWrap color="textSecondary">
        <em>{localizationKey}</em>
      </Typography>
    </TableCell>
    {locales.map((locale, index) => (
      <TableCell key={index}>
        {localizationDataLabel[locale.i] ? (
          localizationDataLabel[locale.i]
        ) : (
          <IconButton
            color="primary"
            onClick={() => findTranslation(localizationDataLabel, locale)}
          >
            <Icon icon={ICONS["DOWNLOAD-CLOUD"]} />
          </IconButton>
        )}
      </TableCell>
    ))}
    <TableCell>
      <IconButton
        size="small"
        onClick={() =>
          showEditKeyDialog(localizationDataLabel, localizationKey)
        }
      >
        <Icon icon={ICONS.EDIT} size={16} />
      </IconButton>

      <IconButton
        size="small"
        onClick={() => showConfirmDeleteRow(localizationKey)}
        className={classes.destructiveBtn}
      >
        <Icon icon={ICONS["TRASH-2"]} size={16} />
      </IconButton>
    </TableCell>
  </TableRow>
);

const useStyles = makeStyles(theme => ({
  table: {
    marginBottom: 72
  },
  destructiveBtn: {
    color: theme.palette.error.main
  }
}));

const LocalizationTable = props => {
  const classes = useStyles();
  console.log(props);
  return (
    <React.Fragment>
      <Table className={classes.table}>
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
                props.showConfirmDeleteRow,
                props.showEditKeyDialog
              )
          )}
          {isEmpty(props.data.localizationData) && (
            <TableRow>
              <TableCell colSpan={props.data.locales.length + 2}>
                <Grid
                  container
                  direction="column"
                  alignContent="center"
                  alignItems="center"
                  style={{ paddingTop: "2em", paddingBottom: "2em" }}
                >
                  <Grid item>
                    <Icon
                      icon={ICONS.LANGUAGE}
                      size={250}
                      color={"rgba(0,0,0,0.1)"}
                    />
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
              </TableCell>
            </TableRow>
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
