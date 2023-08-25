import PropTypes from "prop-types";
import styleModule from "./GeneralButton.module.sass";

const GeneralButton = props => {
  const { element, onClick, type, disabled, className, children, submit } =
    props;
  return (
    <button
      className={`${
        type ? styleModule[type] : styleModule.default
      } ${className} `}
      onClick={onClick}
      disabled={disabled}
      type={submit && "submit"}
    >
      {children}
      {element}
    </button>
  );
};

GeneralButton.propTypes = {
  element: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onClick: PropTypes.func,
  type: PropTypes.oneOf([
    "primary",
    "primary-invert",
    "secundary",
    "secundary-invert"
  ]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  submit: PropTypes.bool
};

export default GeneralButton;
