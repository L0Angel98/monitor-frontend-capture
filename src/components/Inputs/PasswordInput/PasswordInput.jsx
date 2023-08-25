import PropTypes from "prop-types";
import { useState } from "react";
import styleModule from "./PasswordInput.module.sass";
import swichIcon from "./swichIcon";

const PasswordInput = props => {
  const { label, classNameLabel } = props;
  const [showPassword, setShowPassword] = useState(false);

  const handleOnChangeInput = () => setShowPassword(!showPassword);

  return (
    <label className={`${styleModule.label} ${classNameLabel}`}>
      {label}
      <div className={styleModule.containerInputPassword}>
        <input className={styleModule.inputPassword} {...props} type={showPassword ? "text" : "password"} />
        <div className={styleModule.btnPassword} onClick={handleOnChangeInput}>{swichIcon(showPassword)}</div>
      </div>
    </label>
  );
};

PasswordInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  classNameLabel: PropTypes.string
};

export default PasswordInput;
