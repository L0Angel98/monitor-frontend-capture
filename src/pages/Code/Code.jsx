import React, { useState } from "react";
import { Button } from "../../components/Buttons";
import { ReactComponent as ReactIconLogoProwered } from "../../assets/images/logo-powered.svg";
import stylesModule from "./Code.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { loginWithAccessCode, logout } from "../../redux/session/sessionSlice";

function Code() {
  const [code, setCode] = useState("");
  const { company, textAccessCode } = useSelector(state => ({
    company: state.userData.company,
    textAccessCode: state.session.textAccessCode
  }));
  const dispatch = useDispatch();

  const handleChange = event => {
    const { value } = event.target;
    const spaces = new RegExp(/\s+/, "g");

    if (!spaces.test(value)) setCode(value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await dispatch(
      loginWithAccessCode({
        access_code: code.toUpperCase(),
        company_id: company.id
      })
    );
  };

  const handleLogout = async () => {
    await dispatch(logout());
  };

  const hasCode = code.length > 0;

  return (
    <div className={stylesModule.codePage}>
      <div className={stylesModule.codeContainer}>
        <form className={stylesModule.codeCard} onSubmit={handleSubmit}>
          <h2 className={stylesModule.title}>
            Ingresa al sistema con tu código
          </h2>
          <input
            type="text"
            name="code"
            className={`${stylesModule.inputCode} ${
              hasCode && stylesModule.hasCode
            }`}
            onChange={handleChange}
            value={code}
            autoComplete="off"
            required
          />
          <Button
            className={stylesModule.codeButton}
            type={"primary"}
            disabled={!hasCode}
            submit
          >
            {!!textAccessCode ? textAccessCode : "Acceder"}
          </Button>
        </form>
        <Button className={stylesModule.logoutButton} onClick={handleLogout}>
          Salir
        </Button>
        <ReactIconLogoProwered className={stylesModule.logoMonitor} />
      </div>
    </div>
  );
}

export default Code;
