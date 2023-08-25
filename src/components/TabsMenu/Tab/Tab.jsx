import { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import TabsMenuContext from "../TabsMenuContext";
import styleModules from "./Tab.module.sass";

function Tab(props) {
  const { children, title, keyTab } = props;
  const { addTab, tabSelected, allTabs } = useContext(TabsMenuContext);

  const handleAddTab = () => {
    const isOnTheList = allTabs.some(tab => tab.keyTab === keyTab);

    if (isOnTheList) return;

    addTab({ title, keyTab });
  };

  useEffect(() => {
    handleAddTab();
  }, []);

  if (keyTab == tabSelected) {
    return <div className={styleModules.tab}>{children}</div>;
  }

  return;
}

Tab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  keyTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Tab;
