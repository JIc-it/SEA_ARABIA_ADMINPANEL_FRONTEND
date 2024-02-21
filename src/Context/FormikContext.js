// FormikContext.js
import React, { createContext, useContext } from 'react';

const FormikContext = createContext();

export const FormikProvider = ({ children, formik }) => (
  <FormikContext.Provider value={formik}>{children}</FormikContext.Provider>
);

export const useFormik = () => {
  const formik = useContext(FormikContext);
  if (!formik) {
    throw new Error('useFormik must be used within a FormikProvider');
  }
  return formik;
};
