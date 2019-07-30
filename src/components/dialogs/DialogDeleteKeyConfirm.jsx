import React from "react";
import BaseDialog from "./BaseDialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";

export default function DialogDeleteKeyConfirm(props) {
  const { localizationKey, handleClose } = props;
  return (
    <BaseDialog
      open={props.open}
      handleClose={handleClose}
      title={`Confirm removal of "${localizationKey}"?`}
      content={
        <React.Fragment>
          <DialogContentText>
            {`Are you sure want to permanently delete the key "${localizationKey}"? `}
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
          <Button
            onClick={() => props.confirmDeleteKey(localizationKey)}
            color="secondary"
          >
            Delete Key
          </Button>
        </React.Fragment>
      }
    />
  );
}
