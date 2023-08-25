import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkstationData } from "../redux/dashboard/dashboardSlice";

export default function () {
  const workstationSelected = useSelector(
    state => state.dashboard.workstationSelected
  );

  const errors = useSelector(state => state.dashboard.errors);
  const dispatch = useDispatch();

  const fetchData = async () => {
    if (workstationSelected) {
      await dispatch(getWorkstationData());
    }
  };
  useEffect(() => {
    fetchData();
  }, [workstationSelected]);

  return errors;
}
