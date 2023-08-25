import { useEffect, useState } from "react";
import axiosInstance from "../../../../axiosConfig";
import { DASHBOARD } from "../../../routes";
import { useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";

export default function ({ hasOfs }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const workstationSelected = useSelector(
    state => state.dashboard.workstationSelected
  );

  const getItems = async () => {
    setLoading(true);
    try {
      const resp = await axiosInstance.get(
        hasOfs ? DASHBOARD.MOS : DASHBOARD.PARTS,
        {
          params: {
            workstation_id: workstationSelected?.id
          },
          headers: {
            Authorization: `Token ${secureLocalStorage.getItem("token")}`
          }
        }
      );

      if (resp.data.code === 0) {
        setItems([]);
      } else {
        setItems([...resp.data.items]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (typeof hasOfs == "boolean") {
      getItems();
    }
  }, [workstationSelected, hasOfs]);

  return { items, loading };
}
