import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SideBar from "./SideBar/SideBar";
import stylesModule from "./Layout.module.sass";
import optionsSideBar from "./SideBar/optionsSideBar";
import { useDispatch, useSelector } from "react-redux";
import useSocketConnection from "../../hooks/useSocketConnection";
import { handleUpdateDataWorkstation } from "../../redux/workstationsListSlice/workstationsListSlice";
import useViewControl from "../../hooks/useViewControl";
import { ModalLoad } from "../Modals/Modals";
import { createSelector } from "@reduxjs/toolkit";
import { useMatch } from "react-router-dom";
import TopBar from "./TopBar/TopBar";

const selectorLayoutData = createSelector(
  state => ({
    company: state.userData.company,
    loading: state.dashboard.loading
  }),
  state => state
);

function Layout(props) {
  const { children } = props;
  const [modal, setModal] = useState(null);

  const pathDetected = useMatch("/dashboard");

  const { company, loading } = useSelector(selectorLayoutData);
  const dispatch = useDispatch();
  const socket = useSocketConnection(`company_${company.id}`);
  const redirect = useViewControl();

  useEffect(() => {
    if (socket) {
      socket.on("server:changeWorkstationFromTheList", data => {
        dispatch(handleUpdateDataWorkstation(data));
      });
    }
    return () => {
      if (socket) {
        socket.off("server:changeWorkstationFromTheList");
      }
    };
  }, [company.id]);

  useEffect(() => {
    setModal(loading ? <ModalLoad /> : null);
  }, [loading]);

  return (
    <div className={stylesModule.layout}>
      {modal}
      {redirect}
      <TopBar />
      <div className={stylesModule.content}>
        {pathDetected && <SideBar options={optionsSideBar} />}
        <section className={stylesModule.body} id="main-content">
          <div className={stylesModule.scroll}>{children}</div>
        </section>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default Layout;
