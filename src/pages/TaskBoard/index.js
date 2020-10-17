import React from 'react';

// Additional Libraries
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

// KanbanDB
import KanbanDB from 'kanbandb/dist/KanbanDB';

// Styles
import styles from './index.styles';

// Components
import FeedbackOption from '../../components/FeedbackOption';
import Column from '../../components/Column';
import CardAdder from '../../components/CardAdder';

// Constants
import APPLICATION_CONSTANTS from '../../constants/ApplicationConstants';

class TaskBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: { ...APPLICATION_CONSTANTS.TASKBOARD_COLUMNS },
      taskCards: [],
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

  render() {
    const { classes } = this.props;
    const { columns, taskCards } = this.state;

    return (
      <>
        <FeedbackOption />
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
        </Grid>
        <CardAdder
          refreshTaskCards={this.refreshTaskCards}
        />
      </>
    );
  }
}

TaskBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskBoard);
