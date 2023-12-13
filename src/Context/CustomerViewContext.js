// import React, { useState, useEffect, createContext, useContext } from "react";
// import { getCustomerlist } from "../services/CustomerHandle";


// const CustomerViewContext = createContext();

// export const CustomerViewProvider = ({ children }) => {
//   const [customerIdState, setCustomerId] = useState();

//   useEffect(() => {
//     getCustomerlist()
//       .then((data) => {
//         setCustomerId(data.results[0]?.id);
//       })
//       .catch((error) => {
//         console.error("Error fetching distributor data:", error);
//       });
//   }, []);

//   // You can provide other values in the value object if needed
//   const value = { customerId: customerIdState };

//   return (
//     <CustomerViewContext.Provider value={value}>
//       {children}
//     </CustomerViewContext.Provider>
//   );
// };

// export const useCustomerView = () => {
//   return useContext(CustomerViewContext);
// };
