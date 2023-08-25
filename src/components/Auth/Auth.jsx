import { Suspense, lazy } from "react";
import { ModalLoad } from "../Modals/Modals";
import { useSelector } from "react-redux";
import handleUpdateSessionAllWindows from "../../utils/handleUpdateSessionAllWindows";
import handleGetUserData from "./handleGetUserData";
import handleGetStatusSession from "./handleGetStatusSession";

const Code = lazy(() => import("../../pages/Code/Code"));
const Login = lazy(() => import("../../pages/Login/Login"));

const Auth = WrappedComponent => {
  const AuthWrappedComponent = () => {
    const { isAuth, loading, sessionADAC, sessionWithCode } = useSelector(
      state => ({
        isAuth: state.session.isAuth,
        loading: state.userData.loading || state.session.loadingCheckSession,
        sessionADAC: state.userData.sessionADAC,
        sessionWithCode: state.session.sessionWithCode
      })
    );

    handleGetStatusSession();

    handleGetUserData();

    handleUpdateSessionAllWindows();

    if (loading) {
      return <ModalLoad />;
    }

    if (!isAuth) {
      return (
        <Suspense fallback={<ModalLoad />}>
          <Login />
        </Suspense>
      );
    }

    if (sessionADAC && !sessionWithCode) {
      return (
        <Suspense fallback={<ModalLoad />}>
          <Code />
        </Suspense>
      );
    }

    return <WrappedComponent />;
  };

  return AuthWrappedComponent;
};

export default Auth;
