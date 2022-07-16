import { Fragment } from "react";
import { Popup } from "react-map-gl";
import { useForm } from "react-hook-form";
import axios from "axios";

import "./style.css";
import { useAuth } from "../../context/AppProvider";

export const NewPinForm = ({ newPlace, setNewPlace, setRefetch }) => {
  const { user, accessToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const newPinData = {
      ...data,
      lat: newPlace?.lat,
      long: newPlace?.long,
    };

    const { data: requestData } = await axios.post("/pin", newPinData, {
      headers: { authorization: `Bearer ${accessToken}` },
    });
    setNewPlace(null);

    requestData.success && setRefetch((prevState) => !prevState);
  };

  return (
    <Fragment>
      {user && (
        <Popup
          longitude={newPlace?.long}
          latitude={newPlace?.lat}
          anchor="left"
          closeOnClick={false}
          closeButton={true}
          onClose={() => setNewPlace(null)}
        >
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Title</label>
              <input
                placeholder="Enter title"
                {...register("title", { required: true })}
              />
              <label>Review</label>
              <textarea
                {...register("description", { required: true })}
                placeholder="Enter your review"
              />
              <label>Rating </label>
              <input
                defaultValue={3}
                type="rating"
                {...register("rating", { min: 1, max: 5 })}
              />

              {(errors.title || errors.description || errors.rating) && (
                <span>All the fields are required</span>
              )}

              <button className="submitButton" type="submit">
                Add pin
              </button>
            </form>
          </div>
        </Popup>
      )}
    </Fragment>
  );
};
