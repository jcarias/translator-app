import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography
} from "@material-ui/core";

const buildHeaderRow = locales =>
  locales.map((locale, key) => <TableCell key={key}>{locale}</TableCell>);

const buildTranslationsRow = (locales, localizationDataLabel) => (
  <React.Fragment>
    {locales.map((locale, index) => (
      <TableCell key={index}>{localizationDataLabel[locale]}</TableCell>
    ))}
  </React.Fragment>
);

const LocalizationTable = props => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>i18N Key</TableCell>
          {buildHeaderRow(props.data.locales)}
          <TableCell>Tools</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.keys(props.data.localizationData).map((key, index) => (
          <TableRow key={index} hover>
            <TableCell variant="body" nowrap="nowrap">
              <Typography noWrap>{key}</Typography>
            </TableCell>
            {buildTranslationsRow(
              props.data.locales,
              props.data.localizationData[key]
            )}
            <TableCell>{"TODO!!"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LocalizationTable;
