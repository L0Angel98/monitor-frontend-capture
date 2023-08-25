import PropTypes from "prop-types";
import stylesModule from "./Item.module.sass";

const Item = props => {
  const { label, value, onChange, itemSelected } = props;

  const handleChange = () => {
    onChange(value);
  };

  return (
    <li className={stylesModule.item}>
      <button
        className={`${stylesModule.btnItem} ${
          itemSelected === value && stylesModule.itemSelected
        }`}
        onClick={handleChange}
      >
        {label}
      </button>
    </li>
  );
};

Item.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  itemSelected: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Item;
