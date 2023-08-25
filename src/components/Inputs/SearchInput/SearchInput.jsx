import stylesModule from "./SearchInput.module.sass";
import PropTypes from "prop-types";
import { ReactComponent as ReacIconSearch } from "../../../assets/images/search.svg";

const SearchInput = props => {
  const { className, value } = props;

  return (
    <div className={`${stylesModule.containerInputSearch} ${className}`}>
      <ReacIconSearch
        height="25px"
        width="25px"
        stroke="#7d80da"
        className={!!value ? stylesModule.hiddenIcon : undefined}
      />
      <input {...props} className={stylesModule.inputSearch} type="text" />
    </div>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string
};

export default SearchInput;
