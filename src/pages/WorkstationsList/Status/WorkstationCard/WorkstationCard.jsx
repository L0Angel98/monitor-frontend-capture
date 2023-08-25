import React from "react";
import PropTypes from "prop-types";
import stylesModule from "./WorkstationCard.module.sass";
import { shortName, showNameWorkstation } from "../../../../utils/validations";
import ActivedParts from "./ActivedParts/ActivedParts";
import PartsSwitch from "../../../../components/PartsSwitch/PartsSwitch";

const WorkstationCard = props => {
  const {
    status = "unavailable",
    onChange,
    id,
    name,
    alias,
    user,
    activated_parts = [],
    actived_manufacturing_orders = []
  } = props;

  const handleChange = () => {
    if (status === "available") {
      onChange({ id, name, alias });
    }
  };

  return (
    <button
      className={stylesModule.linkWorkstation}
      onClick={() => handleChange()}
      data-testid="workstation-card"
    >
      <div status={status} className={stylesModule.workstationCard}>
        <h4 className={stylesModule.name}>
          {showNameWorkstation({ name, alias })}
          <PartsSwitch quantity={activated_parts.length} />
        </h4>
        <span className={stylesModule.separator} />
        <ActivedParts
          parts={activated_parts}
          manufacturingOrders={actived_manufacturing_orders}
        />
        <footer className={stylesModule.cardFooter}>
          <span
            status={status}
            className={stylesModule.status}
            data-testid={"workstation-status"}
          >
            {status === "available" ? "Disponible" : "En operación"}
          </span>
          {status === "unavailable" && <span>{shortName(user.name)}</span>}
        </footer>
      </div>
    </button>
  );
};

WorkstationCard.propTypes = {
  status: PropTypes.oneOf(["available", "unavailable"]),
  workstation: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

export default WorkstationCard;
