import { Fragment } from "react";
import { Marker } from "react-map-gl";
import { useAuth } from "../../context/AppProvider";

export const Markers = ({ pin, handleMarkerOnClick }) => {
  const { user } = useAuth();

  const handlePinColor = () => {
    if (user) {
      if (pin?.username === user?.username) return "red";
      else return "blue";
    } else return "yellow";
  };
  return (
    <Fragment>
      <Marker
        style={{ cursor: "pointer" }}
        longitude={pin?.long}
        latitude={pin?.lat}
        color={handlePinColor()}
        onClick={() => {
          handleMarkerOnClick(pin);
        }}
      />
    </Fragment>
  );
};
