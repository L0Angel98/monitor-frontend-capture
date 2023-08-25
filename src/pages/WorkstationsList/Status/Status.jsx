import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import WorkstationCard from "./WorkstationCard/WorkstationCard";
import stylesModule from "./Status.module.sass";
import { useDispatch } from "react-redux";
import { startWorkingWorkstation } from "../../../redux/dashboard/dashboardSlice";

const Status = props => {
  const { type = "available", workstations = [] } = props;
  const [filteredWorkstations, setFilteredWorkstations] = useState([]);

  const dispatch = useDispatch();

  const handleSelectWorkstation = async workstation => {
    await dispatch(startWorkingWorkstation(workstation));
  };

  useEffect(() => {
    setFilteredWorkstations(
      workstations.filter(workstation => workstation.status === type)
    );
  }, [workstations]);

  return (
    <div className={stylesModule.status}>
      {filteredWorkstations.length > 0 ? (
        filteredWorkstations.map(workstation => (
          <WorkstationCard
            key={workstation.id}
            {...workstation}
            onChange={handleSelectWorkstation}
          />
        ))
      ) : (
        <h1>No hay estaciones aquí por el momento</h1>
      )}
    </div>
  );
};

Status.propTypes = {
  type: PropTypes.oneOf(["available", "unavailable"]),
  workstations: PropTypes.array
};

export default Status;
