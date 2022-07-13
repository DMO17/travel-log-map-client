import { Fragment } from "react";
import { BiLogIn } from "react-icons/bi";
import { BsFillKeyFill } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

import classes from "./style.module.css";
import { useAuth } from "../../context/AppProvider";

export const Header = ({
  setShowLoginForm,
  setShowSignupForm,
  setShowProfileModal,
}) => {
  const { user, setIsLoggedIn, setUser } = useAuth();

  const styling = { fontSize: 45, marginLeft: "25px", cursor: "pointer" };

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Travel Log Map</h1>
        <div>
          {!user && (
            <>
              <BiLogIn
                style={styling}
                onClick={() => {
                  setShowSignupForm(false);
                  setShowLoginForm(true);
                }}
              />
              <BsFillKeyFill
                style={styling}
                onClick={() => {
                  setShowLoginForm(false);
                  setShowSignupForm(true);
                }}
              />
            </>
          )}

          {user && (
            <>
              <CgProfile
                style={styling}
                onClick={() => {
                  setShowProfileModal(true);
                }}
              />
              <AiOutlineLogout
                style={styling}
                onClick={() => {
                  setIsLoggedIn(false);
                  setUser(false);
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                }}
              />
            </>
          )}
        </div>
      </header>
    </Fragment>
  );
};
