import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { validationValue } from "../../../../../utils/validations";
import stylesModule from "./ActivedParts.module.sass";

const ActivedParts = props => {
  const { type = "main", parts = [], manufacturingOrders = [] } = props;
  const [part, setPart] = useState(null);
  const [manufacturingOrder, setManufacturingOrder] = useState(null);

  const handleFilterByType = ({ type, list }) => {
    let item = list.find(item => item.type === type);
    return validationValue(item, null);
  };

  useEffect(() => {
    setPart(handleFilterByType({ type, list: parts }));
    setManufacturingOrder(
      handleFilterByType({ type, list: manufacturingOrders })
    );
  }, [parts, manufacturingOrders, type]);

  return (
    <section className={stylesModule.itemsWorked}>
      {part ? (
        <>
          {manufacturingOrder && <p>{manufacturingOrder.code}</p>}
          <p>{`${part.name} - ${part.code}`}</p>
        </>
      ) : (
        <p>No hay parte seleccionada</p>
      )}
    </section>
  );
};

ActivedParts.propTypes = {
  type: PropTypes.oneOf(["main", "associated"]),
  parts: PropTypes.array,
  manufactoringOrders: PropTypes.array
};

export default ActivedParts;
