import { useState, ReactNode } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export interface ConfirmationDialog {
  confirm: Function;
  color: any;
  children: ReactNode;
  displayText: string;
}

export const ConfirmationDialog = (dialogProps: ConfirmationDialog) => {
  const { confirm, color, children, displayText } = dialogProps;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (confirmAction: boolean) => {
    setOpen(false);
    if (!confirmAction) return;
    confirm();
  };

  return (
    <div>
      <Button color={color} onClick={handleClickOpen}>
        {children}
      </Button>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{displayText}</DialogTitle>
        <DialogActions>
          <Button color="error" onClick={() => handleClose(true)}>
            Confirm
          </Button>
          <Button color="primary" onClick={() => handleClose(false)} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
