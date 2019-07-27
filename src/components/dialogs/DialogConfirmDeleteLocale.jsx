import React from "react";
import BaseDialog from "./BaseDialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import isEmpty from "lodash/isEmpty";

export default function DialogConfirmDeleteLocale(props) {
  const { locale, handleClose, confirmDeleteLocale } = props;
  if (isEmpty(locale)) return null;

  return (
    <BaseDialog
      open={props.open}
      handleClose={handleClose}
      title={`Confirm remvoval of "${locale.i}"?`}
      content={
        <React.Fragment>
          <DialogContentText>
            {`Are you sure want to permanently delete the locale "${
              locale.i
            }" (${locale.l} - ${locale.c})? `}
          </DialogContentText>
          <DialogContentText>
            {`This is irreversible and cannot be undone. `}
          </DialogContentText>
        </React.Fragment>
      }
      actions={
        <React.Fragment>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
          <Button onClick={confirmDeleteLocale} color="secondary">
            Delete Locale
          </Button>
        </React.Fragment>
      }
    />
  );
}
