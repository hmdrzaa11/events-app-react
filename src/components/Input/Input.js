import React from "react";
import "./Input.css";

export default function Input({ type, placeholder, value, onChange, name }) {
  let createInput = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="Input-textarea"
          ></textarea>
        );
      case "file":
        return (
          <>
            <input
              type="file"
              name={name}
              value={value}
              onChange={onChange}
              className="Input-file"
              id="file-selector"
            />
            <label className="Input-label" htmlFor="file-selector">
              Select an image
            </label>
          </>
        );
      default:
        return (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="Input-text"
          />
        );
    }
  };
  return <div className="Input">{createInput()}</div>;
}
