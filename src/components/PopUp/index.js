import { Fragment } from "react";
import { Popup } from "react-map-gl";
import { ReviewCard } from "../ReviewCard";

export const PopUp = ({ pin, setCurrentPlace }) => {
  return (
    <Fragment>
      <Popup
        longitude={pin?.long}
        latitude={pin?.lat}
        anchor="left"
        closeOnClick={false}
        closeButton={true}
        onClose={() => setCurrentPlace(null)}
      >
        <ReviewCard {...pin} />
      </Popup>
    </Fragment>
  );
};
