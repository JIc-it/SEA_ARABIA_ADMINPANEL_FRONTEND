import React, { useState } from "react";
import Flags from "react-flags-select";

const SelectBox = () => {
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode);
  };
  const gccCountries = [
    { code: "AE", label: "United Arab Emirates", name: "AE" },
    { code: "BH", label: "Bahrain", name: "BH" },
    { code: "KW", label: "Kuwait", name: "KW" },
    { code: "OM", label: "Oman", name: "OM" },
    { code: "QA", label: "Qatar", name: "QA" },
    { code: "SA", label: "Saudi Arabia", name: "SA" },
  ];

  return (
    <div>
      <Flags
        countries={gccCountries.map((country) => country.code)}
        customLabels={gccCountries.reduce(
          (labels, country) => ({
            ...labels,
            [country.code]: `${country.label} (${country.name})`,
          }),
          {}
        )}
        selected={selectedCountry}
        onSelect={handleCountryChange}
        showSelectedLabel={true}
        showOptionLabel={true} 
      />
    </div>
  );
};

export default SelectBox;