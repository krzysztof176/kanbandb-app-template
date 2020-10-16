import React from 'react';

// Additional Libraries
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// KanbanDB
import KanbanDB from 'kanbandb/dist/KanbanDB';

// Styles
import styles from './index.styles';

// Constants
import APPLICATION_CONSTANTS from '../../constants/ApplicationConstants';

class CardEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      updatedName: props.taskCard.name,
      updatedDescription: props.taskCard.description,
      updatedStatus: props.taskCard.status,
    };
  }

    onChange = (key) => (event) => {
      this.setState({ [key]: event.target.value });
    };

    onClickCancel = () => {
      const { taskCard, onClose } = this.props;
      const { name, description, status } = taskCard;
      this.setState({ updatedName: name, updatedDescription: description, updatedStatus: status });
      onClose();
    };

    onClickSave = () => {
      const { taskCard, refreshTaskCards, onClose } = this.props;
      const { updatedName, updatedDescription, updatedStatus } = this.state;
      const { id } = taskCard;
      KanbanDB.updateCardById(id, { name: updatedName, description: updatedDescription, status: updatedStatus }).then(() => {
        refreshTaskCards();
        onClose();
      }).catch((error) => {
        console.error(error);
        refreshTaskCards();
        onClose();
      });
    };

    render() {
      const { classes, open, taskCard } = this.props;
      const { updatedName, updatedDescription, updatedStatus } = this.state;
      if (!open) {
        return null;
      }

      return (
        <Dialog
          open={open}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle> Card Editor </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  label="Name"
                  value={updatedName}
                  onChange={this.onChange('updatedName')}
                  fullWidth
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Description"
                  value={updatedDescription}
                  onChange={this.onChange('updatedDescription')}
                  fullWidth
                />
              </Grid>

              <Grid item xs={3}>
                <FormControl className={classes.formControl}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={updatedStatus}
                    onChange={this.onChange('updatedStatus')}
                  >
                    {
                        Object.values(APPLICATION_CONSTANTS.TASKBOARD_COLUMNS).map((column) => (
                          <MenuItem
                            value={column.name}
                            key={`taskboard-status-menuitem-${column.name.toLowerCase()}`}
                          >
                            {column.displayName}
                          </MenuItem>
                        ))
                    }
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button
              variant="outlined"
              onClick={this.onClickCancel}
            >
              Cancel
            </Button>
            <Button
              className={classes.saveButton}
              variant="outlined"
              onClick={this.onClickSave}
              disabled={updatedName === taskCard.name
                  && updatedDescription === taskCard.description
                  && updatedStatus === taskCard.status}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
}

CardEditor.propTypes = {
  classes: PropTypes.object.isRequired,

  // Passed Props
  open: PropTypes.bool.isRequired,
  taskCard: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    created: PropTypes.number.isRequired,
    lastUpdated: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  refreshTaskCards: PropTypes.func.isRequired,
};

export default withStyles(styles)(CardEditor);
