import React, { useContext } from "react";
import PropTypes from "prop-types";
import TabsMenuContext from "../TabsMenuContext";
import stylesModule from "./TabsSelector.module.sass";
import { NavLink } from "react-router-dom";

const TabSelector = props => {
  const { onChange, path = "" } = props;
  const { allTabs, tabSelected } = useContext(TabsMenuContext);

  const handleChangeTab = event => {
    const { id } = event.target;
    onChange(id);
  };

  return (
    <nav className={stylesModule.navTab} data-testid="tab-selector">
      <ul className={stylesModule.tabSelector}>
        {allTabs.map(tab => (
          <li key={tab.keyTab} className={stylesModule.tabItemSelector}>
            <NavLink
              className={`${stylesModule.tabBtn} ${
                tabSelected == tab.keyTab && stylesModule.tabSelected
              }`}
              id={tab.keyTab}
              onClick={handleChangeTab}
              to={`${path}/${tab.keyTab}`}
            >
              {tab.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

TabSelector.propTypes = {
  onChange: PropTypes.func,
  path: PropTypes.string
};

export default TabSelector;
