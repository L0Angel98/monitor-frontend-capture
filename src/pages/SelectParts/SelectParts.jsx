import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TabsMenu from "../../components/TabsMenu/TabsMenu";
import Tab from "../../components/TabsMenu/Tab/Tab";
import stylesModule from "./SelectParts.module.sass";
import SelectPartOF from "./SelectPartOF/SelectPartOF";
import {
  createOptionsOfs,
  createOptionsParts,
  excludeById,
  handleOfsList,
  handlePartsList,
  modalConfirmPartsShowValidations
} from "../../utils/validations";
import {
  ModalConfirmationFooter,
  ModalError,
  ModalLoad
} from "../../components/Modals/Modals";
import PartsSwitch from "../../components/PartsSwitch/PartsSwitch";
import { useDispatch, useSelector } from "react-redux";
import useGetItemsSelectParts from "./hooks/useGetItemsSelectParts";
import axiosInstance from "../../../axiosConfig";
import { DASHBOARD } from "../../routes";
import secureLocalStorage from "react-secure-storage";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import useUpdateWorkstationData from "../../hooks/useUpdateWorkstationData";
import { handleChangePart } from "../../redux/dashboard/dashboardSlice";

const defaultFormParts = { main: {}, secondary: {} };

function SelectParts(props) {
  const [formParts, setFormParts] = useState({ ...defaultFormParts });
  const [numberOfParts, setNumberOfParts] = useState(1);
  const [modalConfirmation, setModalConfirmation] = useState(null);
  const [modal, setModal] = useState(null);
  const workstation = useSelector(state => state.dashboard.workstation);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useGetItemsSelectParts({
    hasOfs: workstation?.use_manufacturing_orders
  });

  const errors = useUpdateWorkstationData();

  const handleChange = item => {
    const { name, value } = item;
    setFormParts({
      ...formParts,
      [name]: {
        ...formParts[name],
        [value.name]: value.value
      }
    });
  };

  const sendPartActivation = async () => {
    try {
      setModal(<ModalLoad />);
      const resp = await axiosInstance.post(
        DASHBOARD.PART_ACTIVATION,
        {
          workstation_id: workstation.id,
          part_id: formParts.main.part,
          event_date: moment().format("YYYY-MM-DD"),
          starts_at: workstation?.schedule?.starts_at
            ? moment(workstation.schedule.starts_at)
                .utc()
                .format("YYYY-MM-DD HH:mm:ss")
            : null,
          ends_at: workstation?.schedule?.ends_at
            ? moment(workstation.schedule.ends_at)
                .utc()
                .format("YYYY-MM-DD HH:mm:ss")
            : null,
          associated_part: formParts.secondary.part,
          mfg_order_workstation_parts_id: [
            formParts.main.of,
            formParts.secondary.of
          ].filter(item => item != null)
        },
        {
          headers: {
            Authorization: `Token ${secureLocalStorage.getItem("token")}`
          }
        }
      );
      if (resp.data.code === 0) {
        setModal(
          <ModalError
            unmount={() => setModal(null)}
            messages={resp.data.messages}
          />
        );
      } else {
        setModalConfirmation(null);
        setModal(null);
        dispatch(handleChangePart(false));
        navigate("/dashboard");
      }
    } catch (error) {
      setModal(
        <ModalError unmount={() => setModal(null)} messages={[error.message]} />
      );
    }
  };

  useEffect(() => {
    if (
      modalConfirmPartsShowValidations({
        form: formParts,
        partsQuantity: numberOfParts,
        includeOfs: workstation?.use_manufacturing_orders
      })
    ) {
      setModalConfirmation(
        <ModalConfirmationFooter
          message="Seleccionar parte"
          unmount={() => {
            setFormParts({ ...defaultFormParts });
            setModalConfirmation(null);
          }}
          onConfirm={sendPartActivation}
        />
      );
    } else {
      setModalConfirmation(null);
    }
  }, [formParts, numberOfParts]);

  useEffect(() => {
    setModal(loading ? <ModalLoad /> : null);
  }, [loading]);

  useEffect(() => {
    if (errors.length > 0) {
      setModal(<ModalError unmount={() => setModal(null)} messages={errors} />);
    }
  }, [errors]);

  if (workstation === null || !workstation?.parallel_parts) {
    return (
      <div className={stylesModule.selectParts}>
        {modal}
        {modalConfirmation}
        <SelectPartOF
          hasOfs={workstation?.use_manufacturing_orders}
          ofsList={createOptionsOfs(
            handleOfsList({
              items,
              hasOfs: workstation?.use_manufacturing_orders
            })
          )}
          partsList={createOptionsParts(
            handlePartsList({
              items,
              ofSelected: formParts.main.of,
              hasOfs: workstation?.use_manufacturing_orders
            })
          )}
          name="main"
          onChange={handleChange}
          values={formParts.main}
        />
      </div>
    );
  }

  return (
    <div className={stylesModule.selectParts}>
      {modal}
      {modalConfirmation}
      <TabsMenu
        defaultTab={1}
        path={"/select-parts"}
        paramKey={"quantity"}
        onChangeTab={tab => setNumberOfParts(tab)}
      >
        <Tab
          keyTab={1}
          title={
            <>
              <PartsSwitch quantity={1} className={stylesModule.iconParts} />
              Trabajar una parte
            </>
          }
        >
          <SelectPartOF
            hasOfs={workstation?.use_manufacturing_orders}
            ofsList={createOptionsOfs(
              handleOfsList({
                items,
                hasOfs: workstation?.use_manufacturing_orders
              })
            )}
            partsList={createOptionsParts(
              handlePartsList({
                items,
                ofSelected: formParts.main.of,
                hasOfs: workstation?.use_manufacturing_orders
              }).filter(
                excludeById([
                  formParts.secondary.part,
                  workstation?.active_part.id
                ])
              )
            )}
            name="main"
            onChange={handleChange}
            values={formParts.main}
          />
        </Tab>
        <Tab
          keyTab={2}
          title={
            <>
              <PartsSwitch quantity={2} className={stylesModule.iconParts} />
              Trabajar dos partes
            </>
          }
        >
          <div className={stylesModule.twoParts}>
            <TabsMenu
              defaultTab={"main"}
              path={"/select-parts/2"}
              paramKey={"part"}
            >
              <Tab keyTab={"main"} title={"Seleccionar primera orden y parte"}>
                <SelectPartOF
                  hasOfs={workstation?.use_manufacturing_orders}
                  ofsList={createOptionsOfs(
                    handleOfsList({
                      items,
                      hasOfs: workstation?.use_manufacturing_orders
                    })
                  )}
                  partsList={createOptionsParts(
                    handlePartsList({
                      items,
                      ofSelected: formParts.main.of,
                      hasOfs: workstation?.use_manufacturing_orders
                    }).filter(
                      excludeById([
                        formParts.secondary.part,
                        workstation?.active_part.id
                      ])
                    )
                  )}
                  name="main"
                  onChange={handleChange}
                  values={formParts.main}
                />
              </Tab>
              <Tab
                keyTab={"secondary"}
                title={"Seleccionar segunda orden y parte"}
              >
                <SelectPartOF
                  hasOfs={workstation?.use_manufacturing_orders}
                  ofsList={createOptionsOfs(
                    handleOfsList({
                      items,
                      hasOfs: workstation?.use_manufacturing_orders
                    })
                  )}
                  partsList={createOptionsParts(
                    handlePartsList({
                      items,
                      ofSelected: formParts.secondary.of,
                      hasOfs: workstation?.use_manufacturing_orders
                    }).filter(
                      excludeById([
                        formParts.main.part,
                        workstation?.active_part.associated_part?.id
                      ])
                    )
                  )}
                  name="secondary"
                  onChange={handleChange}
                  values={formParts.secondary}
                />
              </Tab>
            </TabsMenu>
          </div>
        </Tab>
      </TabsMenu>
    </div>
  );
}

SelectParts.propTypes = {};

export default SelectParts;
