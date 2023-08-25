import PropTypes from "prop-types";
import { ReactComponent as ReactIconTwoPart } from "../../assets/images/two-parts.svg";
import stylesModule from "./PartsSwitch.module.sass";

const PartsSwitch = props => {
  const { quantity = 1, className } = props;
  if (quantity === 0) {
    return;
  }
  return (
    <ReactIconTwoPart
      className={`${quantity === 1 && stylesModule.onePart} ${className}`}
      data-testid="part-switch"
    />
  );
};

PartsSwitch.propTypes = {
  quantity: PropTypes.number,
  className: PropTypes.string
};

export default PartsSwitch;
