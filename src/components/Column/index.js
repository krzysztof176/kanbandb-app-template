import React from 'react';

// Additional Libraries
import PropTypes from 'prop-types';
import {Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import _ from 'lodash';

// Styles
import styles from './index.styles';

// Components
import TaskCard from '../TaskCard';

const Column = (props) => {
    const {classes, name, title, taskCards, refreshTaskCards} = props;

    return(
        <Grid container>
            <Grid item xs={12}>
                <Typography className={classes.typography}>
                    {title}
                </Typography>
            </Grid>

            <Grid className={`${classes.gridContainer} ${name==='DONE' ? classes.lastColumn : ''}`}>
                {  
                    _.filter(taskCards, {status: name}).map(taskCard => (
                        <Grid item xs={12} key={`taskboard-card-${taskCard.id}-${taskCard.lastUpdated}`}>
                            <TaskCard
                                taskCard={taskCard}
                                refreshTaskCards={refreshTaskCards}
                            />
                        </Grid>
                    ))
                }           
            </Grid>     
        </Grid>
    );
};

Column.propTypes = {
    classes: PropTypes.object.isRequired,

    // Passed Props
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    taskCards: PropTypes.array.isRequired,
    refreshTaskCards: PropTypes.func.isRequired,
};

export default withStyles(styles)(Column);