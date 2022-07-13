import { useState, useEffect } from "react";
import Map from "react-map-gl";
import axios from "axios";

import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";

import { PopUpMarker } from "./components/PopUpMarker";
import { NewPinForm } from "./components/NewPinForm";
import { Header } from "./components/Header";
import { LoginForm } from "./components/LoginForm";
import { AppProvider } from "./context/AppProvider";
import { SignUpForm } from "./components/SignUpForm";
import { Profile } from "./components/Profile";

function App() {
  const viewPortObj = {
    latitude: 42,
    longitude: 17,
    zoom: 2,
  };

  const [pins, setPins] = useState([]);
  const [currentPlace, setCurrentPlace] = useState();
  const [newPlace, setNewPlace] = useState(null);
  const [viewPort, setViewPort] = useState(viewPortObj);
  const [refetch, setRefetch] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    const pinData = async () => {
      try {
        const { data } = await axios.get("/pin");

        setPins(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    pinData();
  }, [refetch]);

  const handleMarkerOnClick = (pin) => {
    setCurrentPlace(pin._id);
    setViewPort((prevSate) => {
      return { ...prevSate, longitude: pin.long, latitude: pin.lat };
    });
  };

  const handleAddNewPin = (e) => {
    const { lng: long, lat } = e.lngLat;
    setNewPlace((prevSate) => {
      return { ...prevSate, lat, long };
    });
  };

  return (
    <AppProvider>
      <Header
        setShowLoginForm={setShowLoginForm}
        setShowSignupForm={setShowSignupForm}
        setShowProfileModal={setShowProfileModal}
      />
      <Map
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        onDblClick={handleAddNewPin}
        initialViewState={viewPort}
      >
        <PopUpMarker
          pins={pins}
          handleMarkerOnClick={handleMarkerOnClick}
          setCurrentPlace={setCurrentPlace}
          currentPlace={currentPlace}
        />
        {newPlace && (
          <NewPinForm
            newPlace={newPlace}
            setNewPlace={setNewPlace}
            setPins={setPins}
            setRefetch={setRefetch}
          />
        )}
      </Map>
      {showLoginForm && <LoginForm setShowLoginForm={setShowLoginForm} />}

      {showSignupForm && <SignUpForm setShowSignupForm={setShowSignupForm} />}

      {showProfileModal && (
        <Profile setShowProfileModal={setShowProfileModal} pins={pins} />
      )}
    </AppProvider>
  );
}

export default App;
