import React from 'react';

// Additional Libraries
import PropTypes from 'prop-types';
import {
  Grid, Button, TextField, Card, CardContent, FormControl, InputLabel, Select, MenuItem,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

// KanbanDB
import KanbanDB from 'kanbandb/dist/KanbanDB';

// Styles
import styles from './index.styles';

// Components
import Column from '../../components/Column';

// Constants
import APPLICATION_CONSTANTS from '../../constants/ApplicationConstants';

class TaskBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: { ...APPLICATION_CONSTANTS.TASKBOARD_COLUMNS },
      taskCards: [],
      cardName: '',
      cardDescription: '',
      cardStatus: 'TODO',
    };
  }

  componentDidMount() {
    KanbanDB.connect();
  }

  componentWillUnmount() {
    KanbanDB.disconnect();
  }

  refreshTaskCards = () => {
    KanbanDB.getCards().then((result) => {
      this.setState({ taskCards: _.cloneDeep(result) });
    }).catch((error) => {
      console.error(error);
      this.setState({ taskCards: [] });
    });
  };

  addCard = (name, description, status = 'TODO') => {
    KanbanDB.addCard({ name, description, status }).then(() => {
      this.refreshTaskCards();
    }).catch((error) => {
      console.error(error);
      this.refreshTaskCards();
    });
    this.setState({ cardName: '', cardDescription: '', cardStatus: 'TODO' });
  };

  onChange = (key) => (event) => {
    this.setState({ [key]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const {
      columns, taskCards, cardName, cardDescription, cardStatus,
    } = this.state;

    return (
      <Grid container className={classes.gridContainer}>
        {
          Object.keys(columns).map((columnName) => (
            <Grid
              item
              xs={12 / Object.keys(APPLICATION_CONSTANTS.TASKBOARD_COLUMNS).length}
              key={`taskboard-column-${columnName.toLowerCase()}`}
            >
              <Column
                name={columnName}
                title={columns[columnName].displayName}
                taskCards={taskCards}
                refreshTaskCards={this.refreshTaskCards}
              />
            </Grid>
          ))
      }

        <Card variant="outlined" className={classes.card}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <TextField
                  label="Name"
                  value={cardName}
                  onChange={this.onChange('cardName')}
                  fullWidth
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Description"
                  value={cardDescription}
                  onChange={this.onChange('cardDescription')}
                  fullWidth
                />
              </Grid>

              <Grid item xs={2}>
                <FormControl className={classes.formControl}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={cardStatus}
                    onChange={this.onChange('cardStatus')}
                  >
                    {
                      Object.values(APPLICATION_CONSTANTS.TASKBOARD_COLUMNS).map((column) => (
                        <MenuItem value={column.name} key={`taskboard-status-menuitem-${column.name.toLowerCase()}`}>{column.displayName}</MenuItem>
                      ))
                  }
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={2} className={classes.gridButton}>
                <Button
                  className={classes.button}
                  disabled={_.isEmpty(cardName) || _.isEmpty(cardDescription) || _.isEmpty(cardStatus)}
                  onClick={() => this.addCard(cardName, cardDescription, cardStatus)}
                >
                  Add Task
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

TaskBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskBoard);
