import React, { useState } from "react";
import "./CheckboxList.css";

function CheckboxList({ list }) {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  const getLabelClass = (isChecked) => {
    return isChecked ? "label-checked" : "";
  };

  return (
    <div className="Shoplist">
      {list.map((item) => (
        <div className="elem"key={item.id}>
          <input
            type="checkbox"
            name={item.id}
            checked={checkedItems[item.id] || false}
            onChange={handleCheckboxChange}
          />
          <label className={getLabelClass(checkedItems[item.id])}>
            {item.text}
          </label>
        </div>
      ))}
    </div>
  );
}

export default CheckboxList;