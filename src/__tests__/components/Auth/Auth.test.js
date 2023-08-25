import React from "react";
import { waitFor } from "@testing-library/react";
import Auth from "../../../components/Auth/Auth";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../utils/testUtils";

// Mock del componente "Code" y "Login"
jest.mock("../../../pages/Code/Code", () => () => <div>Code Component</div>);
jest.mock("../../../pages/Login/Login", () => () => <div>Login Component</div>);
jest.mock("../../../components/Modals/Modals", () => ({
  ModalLoad: () => <div>ModalLoad</div>
}));

// Mock de los hooks de React-Redux
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux")
}));

jest.mock("../../../components/Auth/handleGetStatusSession", () => jest.fn());
jest.mock("../../../components/Auth/handleGetUserData", () => jest.fn());
jest.mock("../../../utils/handleUpdateSessionAllWindows", () => jest.fn());

describe("Auth", () => {
  const mockSelector = (isAuth, loading, sessionADAC, sessionWithCode) => ({
    session: { isAuth, sessionWithCode },
    userData: { loading, sessionADAC }
  });

  test("should render ModalLoad while loading", async () => {
    const AuthWrappedComponent = Auth(() => <div>Wrapped Component</div>);

    const { queryByText } = renderWithProviders(<AuthWrappedComponent />, {
      preloadedState: mockSelector(false, true, false, false)
    });

    // Esperar a que se muestre el componente ModalLoad
    await waitFor(() => {
      expect(queryByText(/ModalLoad/i)).toBeInTheDocument();
    });
  });

  test("should render Login component when not authenticated", async () => {
    const AuthWrappedComponent = Auth(() => <div>Wrapped Component</div>);
    const { queryByText } = renderWithProviders(<AuthWrappedComponent />, {
      preloadedState: mockSelector(false, false, false, false)
    });

    // Esperar a que se muestre el componente Login
    await waitFor(() => {
      expect(queryByText(/Login Component/i)).toBeInTheDocument();
    });
  });

  test("should render Code component when authenticated with sessionADAC and no sessionWithCode", async () => {
    const AuthWrappedComponent = Auth(() => <div>Wrapped Component</div>);
    const { getByText } = renderWithProviders(<AuthWrappedComponent />, {
      preloadedState: mockSelector(true, false, true, false)
    });

    // Esperar a que se muestre el componente Code
    await waitFor(() => {
      expect(getByText(/Code Component/i)).toBeInTheDocument();
    });
  });

  test("should render the wrapped component when authenticated with sessionWithCode", async () => {
    const AuthWrappedComponent = Auth(() => <div>Wrapped Component</div>);
    const { getByText } = renderWithProviders(<AuthWrappedComponent />, {
      preloadedState: mockSelector(true, false, true, true)
    });

    // Esperar a que se muestre el componente WrappedComponent
    await waitFor(() => {
      expect(getByText(/Wrapped Component/i)).toBeInTheDocument();
    });
  });
});
