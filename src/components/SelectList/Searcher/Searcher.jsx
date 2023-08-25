import React from "react";
import PropTypes from "prop-types";
import { InputSearch } from "../../Inputs";
import { Button } from "../../Buttons";
import { ReactComponent as ReactIconScan } from "../../../assets/images/scan.svg";
import stylesModule from "./Searcher.module.sass";

const Searcher = props => {
  const { placeholder, btnTitle, valueText, onChangeText } = props;
  return (
    <div className={stylesModule.searcher}>
      <InputSearch
        placeholder={placeholder ? placeholder : "Buscar"}
        onChange={event => onChangeText(event.target.value)}
        value={valueText}
      />
      <Button type={"secundary"} className={stylesModule.btnScanner}>
        <>
          <ReactIconScan />
          {btnTitle ? btnTitle : "Escanear"}
        </>
      </Button>
    </div>
  );
};

Searcher.propTypes = {
  placeholder: PropTypes.string,
  btnTitle: PropTypes.string,
  valueText: PropTypes.string,
  onChangeText: PropTypes.func
};

export default Searcher;
