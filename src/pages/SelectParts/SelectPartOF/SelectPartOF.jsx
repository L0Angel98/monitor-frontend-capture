import PropTypes from "prop-types";
import SelectList from "../../../components/SelectList/SelectList";
import stylesModule from "./SelectPartOF.module.sass";

function SelectPartOF(props) {
  const {
    hasOfs,
    partsList = [],
    ofsList = [],
    name,
    onChange,
    values
  } = props;
  const handleChange = item => {
    onChange({ name, value: item });
  };
  return (
    <div className={stylesModule.selectPartOF}>
      {hasOfs && (
        <SelectList
          name="of"
          title={"Seleccionar order"}
          placeholder={"Buscar orden"}
          btnTitle={"Escanear orden"}
          items={ofsList}
          onChange={handleChange}
          value={values.of}
        />
      )}
      <SelectList
        name="part"
        title={"Seleccionar parte"}
        placeholder={"Buscar parte"}
        btnTitle={"Escanear parte"}
        items={partsList}
        onChange={handleChange}
        value={values.part}
      />
    </div>
  );
}

SelectPartOF.propTypes = {
  hasOfs: PropTypes.bool,
  partsList: PropTypes.array,
  ofsList: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  values: PropTypes.object
};

export default SelectPartOF;
