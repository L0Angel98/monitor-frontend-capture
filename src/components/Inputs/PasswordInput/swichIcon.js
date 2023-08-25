import { ReactComponent as ReactIconHiddenPassword } from "../../../assets/images/icon-hidden-password.svg";
import { ReactComponent as ReactIconShowPassword } from "../../../assets/images/icon-show-password.svg";

export default function (show) {
  if (show) {
    return <ReactIconHiddenPassword />;
  } else {
    return <ReactIconShowPassword />;
  }
}
