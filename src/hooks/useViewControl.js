import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useMatch, matchRoutes } from "react-router-dom";

const selectPartsPaths = [
  { path: "/select-parts" },
  { path: "/select-parts/:quantity" },
  { path: "/select-parts/:quantity/:part" }
];

const selectWorkstationPaths = [
  { path: "/workstations" },
  { path: "/workstations/:tab" }
];

const homePaths = [{ path: "/" }, { path: "/login" }];

function useViewControl() {
  const [reditect, setRedirect] = useState(null);
  const location = useLocation();
  const matchWorkstationsList = matchRoutes(selectWorkstationPaths, location);
  const matchSelectParts = matchRoutes(selectPartsPaths, location);
  const matchHome = matchRoutes(homePaths, location);

  const { workstationSelected, workstation, changePart } = useSelector(
    state => ({
      workstationSelected: state.dashboard.workstationSelected,
      workstation: state.dashboard.workstation,
      changePart: state.dashboard.changePart
    })
  );
  //workstation.active_part?.id

  const handleRedirect = () => {
    if (!workstationSelected) {
      if (!matchWorkstationsList) {
        return <Navigate to={`/workstations/available`} replace={true} />;
      }
    } else if (workstationSelected) {
      const hasActivePart = workstation?.active_part?.id;
      if ((!hasActivePart || changePart) && !matchSelectParts) {
        return <Navigate to={`/select-parts`} replace={true} />;
      } else if (
        (hasActivePart &&
          !changePart &&
          (matchSelectParts || matchWorkstationsList)) ||
        matchHome
      ) {
        return <Navigate to={"/dashboard"} replace={true} />;
      }
    }

    return;
  };

  useEffect(() => {
    setRedirect(handleRedirect());
  }, [location, workstationSelected, workstation, changePart]);

  return reditect;
}

export default useViewControl;
