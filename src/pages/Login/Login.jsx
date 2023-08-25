import React, { startTransition, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Input, InputPass } from "../../components/Inputs";
import styleModule from "./Login.module.sass";
import { Button } from "../../components/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/session/sessionSlice";
import decodeToken from "../../utils/decodeToken";
import getParamsToURL from "../../utils/getParamsToURL";

function Login(props) {
  const [form, setForm] = useState({ user: "", password: "" });
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const textBtnLogin = useSelector(state => state.session.textBtn);
  const paramsUser = decodeToken(getParamsToURL("auth"));

  const handleLogin = async event => {
    event.preventDefault();
    await dispatch(login(form));
  };

  const onChangeForm = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleLoginData = async () => {
    try {
      startTransition(() => {
        if (paramsUser?.user_name && paramsUser?.email) {
          setUserName(paramsUser.user_name);
          setForm({ ...form, user: paramsUser.email });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoginData();
  }, []);

  return (
    <section className={styleModule.containerLogin}>
      <form
        onSubmit={handleLogin}
        className={styleModule.loginForm}
        onChange={onChangeForm}
      >
        {userName && <div>Hola {userName.split(" ")[0]}</div>}
        <Input
          name="user"
          label={"Nombre de usuario o correo electrónico"}
          defaultValue={form.user}
          required
        />

        <InputPass
          name="password"
          label={"Contraseña"}
          defaultValue={form.password}
          required
        />
        <Button submit type="primary" name="login">
          {!!textBtnLogin ? textBtnLogin : "Login"}
        </Button>
      </form>
    </section>
  );
}

Login.propTypes = {};

export default Login;
