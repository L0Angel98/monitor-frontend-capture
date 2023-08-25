import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkStatusSession } from "../../redux/session/sessionSlice";

const handleGetStatusSession = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkStatusSession());
  }, []);
};

export default handleGetStatusSession;
