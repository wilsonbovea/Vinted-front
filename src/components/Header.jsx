import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import Slider from "./Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = ({
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
  getCookie,

  setToPublish,
}) => {
  const [switch1, setSwitch1] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <header>
      <div
        className={
          location.pathname === "/"
            ? "headerAndFilter container"
            : "header-not-filter container"
        }
      >
        <div className="vinted">
          <div className="logo-vinted">
            <NavLink to="/">
              <img
                className="img-logo"
                src="/Vinted_logo.png"
                alt="logo vinted"
              />
            </NavLink>
          </div>
          <button className="hidden-button modal" onClick={() => setDisplay(1)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        {location.pathname === "/login" || location.pathname === "/signup" ? (
          <div className="barre-recherche"></div>
        ) : (
          <div className="barre-recherche">
            <input
              className="barre-inp"
              type="search"
              placeholder="🔍 Recherche des articles"
              value={search}
              onChange={(event) => {
                return setSearch(event.target.value);
              }}
            />
            {location.pathname === "/" && (
              <div className="filter-barre">
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
            )}
          </div>
        )}

        <div
          className={
            connected === false && !cookie
              ? "buttons-connection hide-header-button"
              : "hidden-button"
          }
        >
          <NavLink to="/signup">
            <button>S'inscrire</button>
          </NavLink>
          <NavLink to="/login">
            <button>Se connecter</button>
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
              if (location.pathname === "/publish") {
                navigate("/");
              }
              window.location.reload();
            }}
          >
            Se déconnecter
          </button>
        </div>
        <NavLink to={cookie ? "/publish" : "/login"}>
          <button
            className="button-sell hide-header-button"
            onClick={() => {
              setToPublish(true);
              getCookie();
            }}
          >
            Vends tes articles
          </button>
        </NavLink>
      </div>
    </header>
  );
};
export default Header;
