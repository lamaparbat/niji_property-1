import React, { useState, useCallback, useEffect } from "react";
import Logo from "../../Assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { NavLink } from "react-router-dom";
import "./NavBar.scss";
import { Container } from "react-bootstrap";
import { Burger } from "@mantine/core";
import { Drawer, Collapse } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import Profile from "./Profile";
import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [opened, setOpened] = useState(false);
  const [profileOpened, setProfileOpened] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(true);
  const title = opened ? "Close navigation" : "Open navigation";
  const { currentUser } = useSelector((state) => state.setUser);
  const [picture, setPicture] = useState("");

  const toggle = useCallback(() => setProfileOpened((o) => !o));

  useEffect(() => {
    if (!currentUser) {
      setPicture(
        "https://res.cloudinary.com/dnfr5p8jc/image/upload/v1650535325/ss_kvxzft.png"
      );
    }

    if (currentUser) {
      getDoc(doc(db, "users", currentUser.uid)).then((docSnap) => {
        if (docSnap.exists()) {
          if (docSnap.data().photo) {
            setPicture(docSnap.data().photo);
          }
        } else {
          console.log("No such document!");
        }
      });
    }
  }, [currentUser]);

  return (
    <div className="nav__main">
      {/* Nav Bar Image Nad Heading */}
      <div className="nav__brand">
        <img src={Logo} alt="logo" />
        <h1>Niji property</h1>
      </div>

      {/* Nav Bar Links */}
      <Container>
        <ToastContainer />
        <div className="nav__container">
          <div className="nav__left">
            <SearchIcon />
            <input type="text" placeholder="Search location here"></input>
            <KeyboardArrowDownIcon
              className="nav__arrow"
              style={{ background: "#E5E5E5", color: "#222222" }}
            />
          </div>
          <div className="nav__right">
            {/* Mobile Nav Bar */}

            <Burger
              opened={opened}
              onClick={() => {
                setOpened((o) => !o);
                setDrawerOpened(true);
              }}
              title={title}
              className="nav__burger"
            />

            <Drawer
              opened={opened}
              onClose={() => setOpened(false)}
              padding="xl"
              size="xl"
            >
              <div className="nav__links__mobile">
                <NavLink to="/buy" onClick={() => setOpened(false)}>
                  Buy
                </NavLink>
                <NavLink to="/sell" onClick={() => setOpened(false)}>
                  Sell
                </NavLink>
                <NavLink to="/rent" onClick={() => setOpened(false)}>
                  Rent
                </NavLink>
                <NavLink to="/development" onClick={() => setOpened(false)}>
                  Development
                </NavLink>
                <img
                  src={picture}
                  alt="user"
                  className="navbar__profile"
                  onClick={() => setProfileOpened((o) => !o)}
                />

                <Collapse in={profileOpened}>
                  <Profile toggle={toggle} />
                </Collapse>
              </div>
            </Drawer>

            {/* Mobile Responsive Nav Bar Ends Here */}

            <div className="nav__links">
              <NavLink to="/buy">Buy</NavLink>
              <NavLink to="/sell">Sell</NavLink>

              <NavLink to="/rent">Rent</NavLink>

              <NavLink to="/development">Development</NavLink>

              <img
                src={picture}
                alt="user"
                className="navbar__profile"
                onClick={() => setProfileOpened((o) => !o)}
              />

              <Collapse in={profileOpened}>
                <Profile toggle={toggle} />
              </Collapse>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
