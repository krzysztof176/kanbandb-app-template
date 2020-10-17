import React from 'react';

// Additional Libraries
import { Tooltip } from '@material-ui/core';
import { Feedback } from '@material-ui/icons';

const FeedbackOption = () => {
  return (
    <Tooltip title="Feedback">
      <a href="mailto:krzysztof176@gmail.com?subject=Krzysztof Andres Feedback
        &body=Had fun doing this part of the hiring process.
        %0D%0AHopefully, I have the skills you guys are looking for and we could work together soon.
        %0D%0ACannot wait to meet to you guys 😊
        %0D%0A%0D%0AFeedback below"
        style={{right: 24, top: 0, position: 'absolute', color: '#3e3fa1'}}
      >
          <Feedback />
      </a>
    </Tooltip>
  );
};

FeedbackOption.propTypes = {};

export default FeedbackOption;
