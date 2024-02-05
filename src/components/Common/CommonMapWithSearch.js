import { useState } from "react";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default function CommonMapWithSearch() {
  // replace the key 
  const apiKey = "AIzaSyCe8GC-bp-CZUENPxVWdm8LoAPx-SkMjZg";
  const [center, setCenter] = useState(null);
  const [addressIp, setAddressip] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handlePlaceChange = async (addressIp) => {
    setAddressip(addressIp);
    try {
      const results = await geocodeByAddress(addressIp);
      const latLng = await getLatLng(results[0]);
      setCenter(latLng);
    } catch (error) {
      console.log("Please Check the Location");
    }
  };

  const handleInputChange = (addressIp) => {
    setAddressip(addressIp);
    handlePlaceChange(addressIp);
  };

  const mapOptions = {
    zoomControl: true,
  };

  const handleMapClick = async ({ lat, lng }) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );

      if (response.data.status === "OK") {
        const locationName = response.data.results[0].formatted_address;
        const results = await geocodeByAddress(
          response.data.results[0].formatted_address
        );
        const latLng = await getLatLng(results[0]);

        setCenter(latLng);
        setAddressip(locationName);
        setSelectedLocation({ lat, lng });

        return locationName;
      } else {
        throw new Error("Geocoding API request failed");
      }
    } catch (error) {
      console.error("Error fetching location name:", error.message);
      return null;
    }
  };

  const SelectedMarker = () => (
    <div style={{ position: "absolute", transform: "translate(-50%, -100%)" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35px"
        height="40px"
        viewBox="0 0 384 512"
        style={{ fill: "#a83232" }} // Change the fill color as needed
      >
        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
      </svg>
    </div>
  );

  return (
    <>
      <div>
        <div className="">
          <PlacesAutocomplete
            value={addressIp}
            onChange={setAddressip}
            onSelect={handleInputChange}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <div>
                  <input
                    {...getInputProps({ placeholder: "Enter a place" })}
                    value={addressIp}
                    autoComplete="off"
                    className="form-control py-2 mt-2"
                  />
                  <div
                    className={
                      suggestions.length > 0 &&
                      "border-2 overflow-y-auto rounded-lg lg:w-1/4 md:w-1/4 w-[80%] absolute z-50 bg-slate-100 location-list-container"
                    }
                  >
                    {loading && (
                      <div className={"hover:bg-gray-200 p-2 m-1 rounded-lg"}>
                        Loading...
                      </div>
                    )}
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        {...getSuggestionItemProps(suggestion)}
                        className={
                          "p-2 m-1 rounded-lg location-list-item cursor-pointer"
                        }
                      >
                        {suggestion.description}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
        <div className="my-4">
          <div style={{ height: "60vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: apiKey,
              }}
              center={center}
              defaultZoom={12}
              draggable={true}
              options={mapOptions}
              onClick={handleMapClick}
            >
              {/* Render the SelectedMarker at the selected location */}
              {selectedLocation && (
                <SelectedMarker
                  lat={selectedLocation.lat}
                  lng={selectedLocation.lng}
                />
              )}
            </GoogleMapReact>
          </div>
        </div>
      </div>
    </>
  );
}
{
  /* <GoogleMapReact
bootstrapURLKeys={{
  key: "AIzaSyCe8GC-bp-CZUENPxVWdm8LoAPx-SkMjZg",
}}
defaultCenter={{
  lat: 11.317620280724979, // Replace with your latitude
  lng: 75.9381634501953,
}}
defaultZoom={10}
></GoogleMapReact> */
}
