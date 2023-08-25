import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store"; // Si usas Redux
import Login from "../../pages/Login/Login";
import thunk from "redux-thunk";

describe("Login Page", () => {
  const middlewares = [thunk];

  const mockStore = configureMockStore(middlewares);

  test("should it send password and user to redux", async () => {
    // Crea un estado inicial para el store de Redux (si es necesario)
    const initialState = {
      session: {
        textBtn: "" // Puedes establecer un valor personalizado para textBtn en el estado inicial si lo necesitas para las pruebas.
      }
    };
    const store = mockStore(initialState);

    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    // Simulamos el llenado del formulario
    fireEvent.change(
      getByLabelText(/nombre de usuario o correo electrónico/i),
      {
        target: { value: "usuario_ejemplo" }
      }
    );

    fireEvent.change(getByLabelText(/contraseña/i), {
      target: { value: "contraseña_ejemplo" }
    });

    await waitFor(() => fireEvent.submit(getByText("Login")));

    const expectedForm = {
      user: "usuario_ejemplo",
      password: "contraseña_ejemplo"
    };

    const actions = store.getActions();

    expect(actions[0].meta.arg).toEqual(expectedForm);
  });
});
