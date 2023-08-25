import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import stylesModule from "./TabsMenu.module.sass";
import TabsMenuContext from "./TabsMenuContext";
import { useParams } from "react-router-dom";
import TabSelector from "./TabSelector/TabSelector";

const handleTabSelectedByPath = ({ tab, tabs, defaultTab }) => {
  if (tab && tabs.some(item => item.keyTab == tab)) {
    return tab;
  }
  return defaultTab;
};

function TabsMenu(props) {
  const { children, defaultTab, path, paramKey, onChangeTab } = props;
  const params = useParams();
  const tab = params[paramKey ? paramKey : "tab"];
  const [tabs, setTabs] = useState([]);
  const [tabSelected, setTabSelected] = useState(defaultTab);

  const addTab = ({ keyTab, title }) => {
    setTabs(tabs => [...tabs, { keyTab, title }]);
  };

  useEffect(() => {
    setTabSelected(handleTabSelectedByPath({ tab, tabs, defaultTab }));
  }, [tabs]);

  useEffect(() => {
    onChangeTab && onChangeTab(tabSelected);
  }, [tabSelected]);

  return (
    <div className={stylesModule.tabsMenu}>
      <TabsMenuContext.Provider
        value={{
          addTab,
          tabSelected,
          allTabs: tabs
        }}
      >
        <TabSelector onChange={setTabSelected} path={path} />
        <div className={stylesModule.contentTabSelected}>{children}</div>
      </TabsMenuContext.Provider>
    </div>
  );
}

TabsMenu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  path: PropTypes.string,
  paramKey: PropTypes.string,
  defaultTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeTab: PropTypes.func
};

export default TabsMenu;
