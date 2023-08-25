import React, { useState } from "react";
import PropTypes from "prop-types";
import List from "./List/List";
import stylesModule from "./SelectList.module.sass";
import Searcher from "./Searcher/Searcher";

function SelectList(props) {
  const [filter, setFilter] = useState("");
  const { placeholder, btnTitle, title, items, name, onChange, value } = props;

  const handleFilter = (item, filter) => {
    const pattern = new RegExp(filter, "i");
    return pattern ? pattern.test(item.label) : true;
  };

  return (
    <section className={stylesModule.selectList}>
      <Searcher
        placeholder={placeholder}
        btnTitle={btnTitle}
        onChangeText={setFilter}
        valueText={filter}
      />
      <List
        title={title}
        items={items.filter(item => handleFilter(item, filter))}
        name={name}
        onChange={onChange}
        value={value}
      />
    </section>
  );
}

SelectList.propTypes = {
  placeholder: PropTypes.string,
  btnTitle: PropTypes.string,
  title: PropTypes.string,
  items: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default SelectList;
