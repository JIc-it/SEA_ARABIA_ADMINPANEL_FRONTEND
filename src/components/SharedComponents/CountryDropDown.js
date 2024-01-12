import React from "react";
import Flags from "react-flags-select";

const CountryDropdown = ({ gccCountries, formik }) => {
  const handleCountryChange = (countryCode) => {
    const selectedCountryObject =
      gccCountries &&
      gccCountries.length > 0 &&
      gccCountries.find((country) => country.code === countryCode);
    formik.setFieldValue("location", selectedCountryObject);
  };

  return (
    <div>
      <Flags
        countries={
          gccCountries && gccCountries.length > 0
            ? gccCountries.map((country) => country.code)
            : []
        }
        customLabels={
          gccCountries &&
          gccCountries.length > 0 &&
          gccCountries.reduce(
            (labels, country) => ({
              ...labels,
              [country.code]: `${country.label} (${country.name})`,
            }),
            {}
          )
        }
        selected={formik.values?.location?.code}
        onSelect={handleCountryChange}
        showSelectedLabel={true}
        showOptionLabel={true}
      />
      {/* <Flags
        countries={
          gccCountries && gccCountries.length > 0
            ? gccCountries.map((country) => country.code)
            : []
        }
        customLabels={
          gccCountries &&
          gccCountries.length > 0 &&
          gccCountries.reduce(
            (labels, country) => ({
              ...labels,
              // [country.code]: `${country.label} (${
              //   location.find((loc) => loc.id === country.code)?.name
              // })`,
            }),
            {}
          )
        }
        selected={formik?.values?.location?.code}
        onSelect={handleCountryChange}
        showSelectedLabel={true}
        showOptionLabel={true}
      /> */}
      {formik.touched.location && formik.errors.location ? (
        <div className="error">{formik.errors.location}</div>
      ) : null}
    </div>
  );
};

export default CountryDropdown;
