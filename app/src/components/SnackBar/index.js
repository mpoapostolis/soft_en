import React from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

class PositionedSnackbar extends React.Component {
  state = {
    open: true,
    vertical: 'top',
    horizontal: 'right',
  };

  handleClick = state => () => {
    this.setState({open: true, ...state});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {vertical, horizontal} = this.state;
    const {open} = this.props;
    return (
      <Snackbar
        anchorOrigin={{vertical, horizontal}}
        open={open}
        onClose={this.handleClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={
          <span id="message-id">
            Successfull booking! Thank you for using our service. You will be
            redirected to home-page soon...
          </span>
        }
      />
    );
  }
}

export default PositionedSnackbar;
