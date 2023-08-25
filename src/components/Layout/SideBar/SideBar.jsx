import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SideItem from "./SideItem/SideItem";
import stylesModule from "./SideBar.module.sass";
import useContainerResize from "../../../hooks/useContainerResize";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangePart,
  stopWorkingWorkstation
} from "../../../redux/dashboard/dashboardSlice";
import { useNavigate } from "react-router-dom";
import { ModalError } from "../../Modals/Modals";

const SideBar = props => {
  const { options = [] } = props;
  const [modal, setModal] = useState(null);
  const containerWidth = useContainerResize("user-info");
  const dispatch = useDispatch();
  const errors = useSelector(state => state.dashboard.errorsStopWorking);
  const navigate = useNavigate();

  const handleSelecOption = async ({ path }) => {
    if (path === "workstations") {
      await dispatch(stopWorkingWorkstation());
    } else if (path === "select-parts") {
      dispatch(handleChangePart(true));
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      setModal(<ModalError unmount={() => setModal(null)} messages={errors} />);
    }
  }, [errors]);

  return (
    <aside
      className={stylesModule.sideBar}
      style={{ width: `${containerWidth}px` }}
    >
      {modal}
      <nav>
        {options.map(option => (
          <SideItem
            key={option.key}
            path={`/${option.key}`}
            icon={option.icon}
            label={option.label}
            onClick={() => handleSelecOption({ path: option.key })}
          />
        ))}
      </nav>
    </aside>
  );
};

SideBar.propTypes = {
  options: PropTypes.array
};

export default SideBar;
