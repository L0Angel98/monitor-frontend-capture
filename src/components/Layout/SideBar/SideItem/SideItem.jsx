import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import stylesModule from "./SideItem.module.sass";

const SideItem = props => {
  const { onClick, icon, label } = props;
  return (
    <li className={stylesModule.sideItem}>
      <button onClick={onClick} className={stylesModule.linkToItem}>
        {icon && <span className={stylesModule.icon}>{icon}</span>}
        {label}
      </button>
    </li>
  );
};

SideItem.propTypes = {
  icon: PropTypes.node,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired
};

export default SideItem;
