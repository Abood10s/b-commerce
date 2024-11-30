import React from "react";
import "./style.css";
const FormField = ({
  label,
  id,
  handleChange,
  handleBlur,
  value,
  error,
  placeholder,
  type,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}:</label>
      <input
        className="input"
        type={type || "text"}
        id={id}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        placeholder={placeholder}
      />
      {error && (
        <small style={{ color: "red", fontWeight: "bold" }}>{error}</small>
      )}
    </div>
  );
};

export default FormField;
