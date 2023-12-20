import { Basic } from "./Tabs";
import { useContext, useEffect, useState } from "react";
import { OnboardContext } from "../../Context/OnboardContext";
import { getMOU } from "../../services/leadMangement";

function VendorTabs() {
  const { vendorId } = useContext(OnboardContext);

  const [mou, setMOUs] = useState([]);

  useEffect(() => {
    getMOU()
      .then((data) => {
        setMOUs(data.results);
      })
      .catch((error) => {
        console.error("Error fetching  data:", error);
      });
  }, []);

  return <Basic mou={mou} />;
}

export default VendorTabs;
