import React, { Suspense, lazy, useEffect, useState } from "react";
import PropTypes from "prop-types";
import TabsMenu from "../../components/TabsMenu/TabsMenu";
import Tab from "../../components/TabsMenu/Tab/Tab";
import stylesModule from "./WorkstationsList.module.sass";
import { ModalError, ModalLoad } from "../../components/Modals/Modals";
import { InputSearch } from "../../components/Inputs";
import { useSelector } from "react-redux";
import axiosInstance from "../../../axiosConfig";
import moment from "moment";
import secureLocalStorage from "react-secure-storage";
import { WORKSTATIONS_LIST } from "../../routes";

const Status = lazy(() => import("./Status/Status"));
const History = lazy(() => import("./History/History"));

function WorkstationsList(props) {
  const [filter, setFilter] = useState("");
  const [list, setList] = useState([]);
  const { updateDataWorkstation, loading } = useSelector(state => ({
    updateDataWorkstation: state.workstationsList.updateDataWorkstation,
    loading: state.dashboard.loading
  }));
  const [modal, setModal] = useState(null);

  const handleUpdateWorkstation = ({ list, dataToUpdate }) => {
    let newList = [...list];
    if (dataToUpdate.id) {
      const indexWorkstationToUpdate = newList.findIndex(
        workstation => workstation.id === dataToUpdate.id
      );

      if (indexWorkstationToUpdate !== -1) {
        newList[indexWorkstationToUpdate] = {
          ...newList[indexWorkstationToUpdate],
          ...dataToUpdate
        };
      }
    }

    return newList;
  };

  const getWorkstations = async () => {
    try {
      setModal(<ModalLoad />);
      const resp = await axiosInstance.get(WORKSTATIONS_LIST.WORKSTATIONS, {
        params: {
          datetime: moment().format("YYYY-MM-DD HH:mm:ss")
        },
        headers: {
          Authorization: `Token ${secureLocalStorage.getItem("token")}`
        }
      });

      setList([...resp.data.items]);

      setModal(null);
    } catch (error) {
      setModal(
        <ModalError messages={[error.message]} unmount={() => setModal(null)} />
      );
    }
  };

  useEffect(() => {
    setList(
      handleUpdateWorkstation({ list, dataToUpdate: updateDataWorkstation })
    );
  }, [updateDataWorkstation]);

  useEffect(() => {
    getWorkstations();
  }, []);

  if (loading) {
    return <ModalLoad />;
  }

  return (
    <div className={stylesModule.workstationList}>
      {modal}
      <TabsMenu defaultTab={"available"} path={"/workstations"}>
        <InputSearch
          placeholder="Buscar estación"
          value={filter}
          onChange={event => setFilter(event.target.value)}
          className={stylesModule.inputSearch}
        />
        <Tab keyTab={"available"} title={"Estaciones disponibles"}>
          <Suspense fallback={<ModalLoad />}>
            <Status type={"available"} workstations={list} />
          </Suspense>
        </Tab>
        <Tab keyTab={"unavailable"} title={"Estaciones NO disponibles"}>
          <Suspense fallback={<ModalLoad />}>
            <Status type={"unavailable"} workstations={list} />
          </Suspense>
        </Tab>
        <Tab keyTab={"history"} title={"Historial estaciones"}>
          <Suspense fallback={<ModalLoad />}>
            <History />
          </Suspense>
        </Tab>
      </TabsMenu>
    </div>
  );
}

WorkstationsList.propTypes = {};

export default WorkstationsList;
