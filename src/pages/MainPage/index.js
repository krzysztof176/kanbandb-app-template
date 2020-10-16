import React from 'react';

// Pages
import TaskBoard from '../TaskBoard';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <>
                <TaskBoard/>
            </>
        );
    }
}

MainPage.propTypes = {};

export default TaskBoard;