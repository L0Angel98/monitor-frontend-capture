import React from "react";
import PropTypes from "prop-types";
import Item from "./Item/Item";
import stylesModule from "./List.module.sass";

const List = props => {
  const { title, items = [], name, onChange, value } = props;
  const handleChange = value => {
    onChange({ value, name });
  };
  return (
    <div className={stylesModule.containerList}>
      <h6 className={stylesModule.title}>{title ? title : "Seleccionar"}</h6>
      <div className={stylesModule.list}>
        <ul className={stylesModule.scroll}>
          {items.map(item => (
            <Item
              key={item.value}
              value={item.value}
              label={item.label}
              onChange={handleChange}
              itemSelected={value}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

List.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default List;
