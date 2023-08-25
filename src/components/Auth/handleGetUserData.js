import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../redux/user/userDataSlice";
import { useEffect } from "react";

const handleGetUserData = () => {
  const { isAuth, token } = useSelector(state => ({
    isAuth: state.session.isAuth,
    token: state.session.token
  }));
  const dispatch = useDispatch();

  const validationsGetUserData = async () => {
    if (isAuth) {
      await dispatch(getUserData());
    }
  };

  useEffect(() => {
    validationsGetUserData();
  }, [isAuth, token]);
};

export default handleGetUserData;
