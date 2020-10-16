/* eslint-disable react/forbid-prop-types */
import React from 'react';

// Additional Libraries
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, DialogActions, Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Styles
import styles from './index.styles';

const BasicDecisionMaker = (props) => {
  const {
    classes, title, open, onClose, onExecute,
  } = props;

  if (!open) {
    return null;
  }

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle className={classes.dialogTitle}>
        {title}
      </DialogTitle>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={onClose}
        >
          No
        </Button>
        <Button
          className={classes.confirmButton}
          variant="outlined"
          onClick={onExecute}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

BasicDecisionMaker.propTypes = {
  classes: PropTypes.object.isRequired,

  // Passed Props
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onExecute: PropTypes.func.isRequired,
};

export default withStyles(styles)(BasicDecisionMaker);
