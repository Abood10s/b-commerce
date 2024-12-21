import React from "react";

const SelectComponent = ({ id, name, options, onChange, value }) => {
  return (
    <div className="select-container">
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) =>
          onChange({
            value: e.target.value,
            label: e.target.options[e.target.selectedIndex].text,
          })
        }
      >
        <option value="" disabled>
          اختر فئة فرعية
        </option>
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
