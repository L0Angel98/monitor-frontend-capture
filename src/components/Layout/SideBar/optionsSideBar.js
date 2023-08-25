import { ReactComponent as ReactIconPart } from "../../../assets/images/part.svg";
import { ReactComponent as ReactIconChange } from "../../../assets/images/change.svg";

const optionsSideBar = [
  {
    key: "workstations",
    label: "Cambiar estación",
    icon: <ReactIconChange />
  },
  {
    key: "select-parts",
    label: "Cambiar parte u orden de fabricación",
    icon: <ReactIconPart strokeWidth="2px" />
  }
];

export default optionsSideBar;
