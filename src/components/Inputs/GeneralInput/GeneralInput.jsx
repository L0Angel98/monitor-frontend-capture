import PropTypes from 'prop-types'
import styleModule from "./GeneralInput.module.sass";

const GeneralInput = props => {
  const {label, type="text", classNameLabel} = props;
  return (
    <label className={`${styleModule.label} ${classNameLabel}`}>
      {label}
      <input className={styleModule.generalInput} {...props} type={type} />
    </label>
  )
}

GeneralInput.propTypes = {
label: PropTypes.string,
type: PropTypes.string,
classNameLabel: PropTypes.string
}

export default GeneralInput
