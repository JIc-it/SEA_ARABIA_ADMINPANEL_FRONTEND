import { useField, useFormikContext } from "formik";
import React, { useState, useEffect } from "react";
import Select from "react-select";


const CustomSelect = ({ name, ...props }) => {
  const { values, setFieldValue, setFieldTouched, errors, touched } = useFormikContext();
  const [isOpen, setIsOpen] = useState(false);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "8px",
      borderColor: isOpen ? "#007BFF" : "#ced4da",
      boxShadow: isOpen ? "0 0 0 1px #007BFF" : "none",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "8px",
      border: "1px solid #007BFF",
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
    }),
  };

  const arrowStyles = {
    transition: "transform 0.3s",
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
  };

  const [field, formik] = useField(name);

  const handleChange = (selectedOption) => {
    setFieldValue(name, selectedOption);
    setFieldTouched(name, true);
  };

  useEffect(() => {
    // Handle any side effects when values or errors change
    // For example, you can trigger additional actions or validations
    console.log("Values:", values);
    console.log("Errors:", errors);
  }, [values, errors]);

  return (
    <div className="custom-select">
      <Select
        {...props}
        name={name}
        styles={customStyles}
        onMenuOpen={() => setIsOpen(true)}
        onMenuClose={() => setIsOpen(false)}
        value={field.value}
        onChange={handleChange}
      />
      <div className="custom-arrow" style={arrowStyles}>
        &#9650; {/* Unicode arrow character */}
      </div>
      {formik.touched && formik.error ? <div className="error">{formik.error}</div> : null}
    </div>
  );
};

export default CustomSelect;
