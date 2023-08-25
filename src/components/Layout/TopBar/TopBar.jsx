import React from "react";
import PropTypes from "prop-types";
import styleModule from "./TopBar.module.sass";
import { ReactComponent as ReactIconUser } from "../../../assets/images/user.svg";
import { ReactComponent as ReactIconWorkstation } from "../../../assets/images/workstation.svg";
import { ReactComponent as ReactIconLogout } from "../../../assets/images/exit.svg";
import { useDispatch, useSelector } from "react-redux";
import { validationValue, shortName } from "../../../utils/validations";
import useClock from "../../../hooks/useClock";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { logout } from "../../../redux/session/sessionSlice";
import {
  handleChangePart,
  stopWorkingWorkstation
} from "../../../redux/dashboard/dashboardSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";

const TopBar = props => {
  const { user, workstation, workstationData } = useSelector(state => ({
    user: state.userData.user,
    workstation: state.dashboard.workstationSelected,
    workstationData: state.dashboard.workstation
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { i18n } = useTranslation();
  const date = useClock();

  const handleLogout = async () => {
    await dispatch(stopWorkingWorkstation());
    await dispatch(logout());
  };

  return (
    <header className={styleModule.topBar}>
      <section className={styleModule.user} id="user-info">
        <ReactIconUser height="25px" width="25px" strokeWidth="2px" />
        <span className={styleModule.name}>
          {validationValue(shortName(user?.name), "Desconocido")}
        </span>
      </section>
      <section className={styleModule.notSection}>
        <button
          className={` ${styleModule.workstationSelected} ${
            workstationData && workstationData.active_part?.id
              ? styleModule.btnHeader
              : styleModule.notHasWorkstationSelected
          } ${styleModule.section}`}
          onClick={() => {
            if (workstationData && workstationData.active_part?.id) {
              dispatch(handleChangePart(false));
              navigate("/dashboard");
            }
          }}
        >
          <ReactIconWorkstation height="25px" width="25px" strokeWidth="2px" />
          {workstation
            ? `${workstation.alias ? workstation.alias : workstation.name}`
            : "No hay estación seleccionada"}
        </button>
      </section>
      <section className={styleModule.hour}>
        {moment(date).format("hh:mm a")}
      </section>
      <section className={styleModule.date}>
        {moment(date).locale(i18n.language).format("dddd DD MMMM YYYY")}
      </section>
      <section className={styleModule.notSection}>
        <button
          className={`${styleModule.section} ${styleModule.btnHeader}`}
          onClick={handleLogout}
        >
          <label className={styleModule.contentBtnLogout}>
            <ReactIconLogout height="25px" width="25px" strokeWidth="2px" />
            Salir del sistema
          </label>
        </button>
      </section>
    </header>
  );
};

TopBar.propTypes = {};

export default TopBar;
