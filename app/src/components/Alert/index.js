import React from "react";
import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";

class AlertDialog extends React.Component {
  render() {
    const { open = false, close, push, t } = this.props;
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("your account balance is insufficient to make this call")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => close()} color="primary">
            {t("CANCEL")}
          </Button>
          <Button
            onClick={() => push("/parent-profile")}
            color="primary"
            autoFocus
          >
            {t("GO TOPUP")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AlertDialog;
