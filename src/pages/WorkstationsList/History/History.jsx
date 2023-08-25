import React from "react";
import PropTypes from "prop-types";

const History = props => {
  const { workstations } = props;
  return (
    <div>
      <div>History</div>
    </div>
  );
};

History.propTypes = {
  workstations: PropTypes.array
};

export default History;
