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
  icon,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}:</label>
      <div className="input-container">
        <input
          className="input"
          type={type || "text"}
          id={id}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          placeholder={placeholder}
        />
        {icon && <span className="icon">{icon}</span>}
      </div>
      {error && (
        <small
          style={{
            color: "red",
            display: "block",
            marginTop: "-.1rem",
          }}
        >
          {error}
        </small>
      )}
    </div>
  );
};

export default FormField;
