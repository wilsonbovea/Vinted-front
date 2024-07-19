import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import Slider from "./Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = ({
  offerId,
  setOfferId,
  setConnected,
  connected,
  setChecked,
  setUserToken,
  search,
  setSearch,
  cookie,
  setCookie,
  counter,
  setCounter,
  setDisplay,
}) => {
  const [switch1, setSwitch1] = useState(false);

  return (
    <header>
      <div
        className={
          offerId === 0
            ? "headerAndFilter container"
            : "header-not-filter container"
        }
      >
        <div className="vinted">
          <div className="logo-vinted">
            <NavLink
              to="/"
              onClick={() => {
                setOfferId(0);
              }}
            >
              <img
                className="img-logo"
                src="/Vinted_logo.png"
                alt="logo vinted"
              />
            </NavLink>
          </div>
          <button
            className="hidden-button modal"
            onClick={() => {
              setDisplay(1);
            }}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>

        <div className="barre-recherche">
          <input
            className="barre-inp"
            type="text"
            placeholder="🔍 Recherche des articles"
            value={search}
            onChange={(event) => {
              return setSearch(event.target.value);
            }}
          />

          <div className={offerId === 0 ? "filter-barre" : "hidden-button"}>
            <div className="trier-par">
              <p>Trier par prix:</p>
              <div className="button-trier">
                <button
                  className={!switch1 ? "asc" : ""}
                  onClick={() => {
                    setSwitch1(false);
                    setChecked("price-asc");
                  }}
                >
                  <FontAwesomeIcon icon={faArrowUp} />
                </button>
                <button
                  className={switch1 ? "desc" : ""}
                  onClick={() => {
                    setSwitch1(true);
                    setChecked("price-desc");
                  }}
                >
                  <FontAwesomeIcon icon={faArrowDown} />
                </button>
              </div>
            </div>
            <div className="slider-div">
              <p>{!counter[1] ? "PrixMin" : counter[0] + "€"}</p>
              <Slider counter={counter} setCounter={setCounter} />
              <p>{!counter[1] ? "PrixMax" : counter[1] + "€"}</p>
            </div>
          </div>
        </div>
        <div
          className={
            connected === false && !cookie
              ? "buttons-connection hide-header-button"
              : "hidden-button"
          }
        >
          <NavLink to="/signup">
            <button onClick={() => setOfferId(1)}>S'inscrire</button>
          </NavLink>
          <NavLink to="/login">
            <button onClick={() => setOfferId(1)}>Se connecter</button>
          </NavLink>
        </div>
        <div
          className={
            connected === true || cookie
              ? "button-disconnect hide-header-button"
              : "hidden-button"
          }
        >
          <button
            type="submit"
            onClick={() => {
              Cookies.remove("userToken");

              setUserToken("");
              setCookie("");
              setConnected(false);

              window.location.reload();
              setOfferId(0);
            }}
          >
            Se déconnecter
          </button>
        </div>
        <button className="button-sell hide-header-button">
          Vends tes articles
        </button>
      </div>
    </header>
  );
};
export default Header;
