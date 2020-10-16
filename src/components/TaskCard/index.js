import React from 'react';

// Additional Libraries
import PropTypes from 'prop-types';
import {
  Card, CardContent, Typography, IconButton, Tooltip,
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import Draggable from 'react-draggable';

// KanbanDB
import KanbanDB from 'kanbandb/dist/KanbanDB';

// Styles
import styles from './index.styles';

// Components
import CardEditor from '../CardEditor';
import BasicDecisionMaker from '../BasicDecisionMaker';

// Utils
import { findEntryByField } from '../../utils/JavascriptUtils';

// Constants
import APPLICATION_CONSTANTS from '../../constants/ApplicationConstants';

class TaskCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCardEditorOpen: false,
      isBasicDecisionMakerOpen: false,
      dragging: false,
    };
  }

    // Draggable functions
    onStop = (event) => {
      const { taskCard } = this.props;
      const xPosition = this.getXPosition(event.clientX);
      const element = document.elementFromPoint(xPosition, 0);

      if (findEntryByField(APPLICATION_CONSTANTS.TASKBOARD_COLUMNS, 'displayName', element.textContent) === undefined) {
        element.style.display = 'none';
      }

      this.updateCardById({
        ...taskCard,
        status: findEntryByField(APPLICATION_CONSTANTS.TASKBOARD_COLUMNS, 'displayName', document.elementFromPoint(xPosition, 0).textContent).name,
      });
      this.setState({ dragging: false });
    };

    onDrag = () => {
      this.setState({ dragging: true });
    };

    getXPosition = (clientX) => {
      if (clientX > window.innerWidth) {
        return window.innerWidth - 1;
      }

      if (clientX < 0) {
        return 0;
      }

      return clientX;
    };

    // KanbanDB functions
    updateCardById = (cardDetails) => {
      const { taskCard, refreshTaskCards } = this.props;
      const { dragging } = this.state;
      const { id } = taskCard;

      if (dragging) {
        KanbanDB.updateCardById(id, cardDetails).then(() => {
          refreshTaskCards();
        }).catch((error) => {
          console.error(error);
          refreshTaskCards();
        });
      }
    };

    deleteCardById = () => {
      const { taskCard, refreshTaskCards } = this.props;
      const { id } = taskCard;
      KanbanDB.deleteCardById(id).then(() => {
        refreshTaskCards();
      }).catch((error) => {
        console.error(error);
        refreshTaskCards();
      });
    };

    // On click and on close functions
    onClickCard = () => {
      this.setState({ isCardEditorOpen: true });
    };

    onCloseCardEditor = () => {
      this.setState({ isCardEditorOpen: false });
    };

    onCloseBasicDecisionMaker = () => {
      this.setState({ isBasicDecisionMakerOpen: false });
    };

    onClickDelete = () => {
      this.setState({ isBasicDecisionMakerOpen: true });
    };

    render() {
      const { classes, taskCard, refreshTaskCards } = this.props;
      const { isCardEditorOpen, isBasicDecisionMakerOpen, dragging } = this.state;
      const { name, description } = taskCard;

      return (
        <>
          <Draggable
            onStop={this.onStop}
            onDrag={this.onDrag}
            bounds="body"
          >
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.typography}>
                  {`${name}: ${description}`}
                </Typography>

                <Tooltip title="Edit" placement="bottom-end">
                  <IconButton onClick={this.onClickCard} className={`${classes.iconButton} ${classes.editIconButton}`} disabled={dragging}>
                    <Edit />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete" placement="bottom-end">
                  <IconButton onClick={this.onClickDelete} className={`${classes.iconButton} ${classes.deleteIconButton}`} disabled={dragging}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </CardContent>
            </Card>
          </Draggable>

          <CardEditor
            open={isCardEditorOpen}
            taskCard={taskCard}
            onClose={this.onCloseCardEditor}
            refreshTaskCards={refreshTaskCards}
          />

          <BasicDecisionMaker
            title="Are you sure you want to delete?"
            open={isBasicDecisionMakerOpen}
            onClose={this.onCloseBasicDecisionMaker}
            onExecute={this.deleteCardById}
          />
        </>
      );
    }
}

TaskCard.propTypes = {
  classes: PropTypes.object.isRequired,

  // Passed Props
  taskCard: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    created: PropTypes.number.isRequired,
    lastUpdated: PropTypes.number.isRequired,
  }).isRequired,
  refreshTaskCards: PropTypes.func.isRequired,
};

export default withStyles(styles)(TaskCard);
