import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Header = ({
  offerId,
  setOfferId,
  setConnected,
  connected,
  userName,
  setUserToken,
  search,
  setSearch,
  cookie,
  setCookie,
}) => {
  return (
    <header
      className={offerId === 0 ? "container headerAndFilter" : "container"}
    >
      <div className="logo-vinted">
        <NavLink
          to="/"
          onClick={() => {
            setOfferId(0);
          }}
        >
          <img className="img-logo" src="/Vinted_logo.png" alt="logo vinted" />
        </NavLink>
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

        <div className={offerId === 0 ? "filter-barre" : "hidden-button"}></div>
      </div>
      <div
        className={
          connected === false && cookie === undefined
            ? "buttons-connection"
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
          connected === true || cookie !== undefined
            ? "button-disconnect"
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
      <button className="button-sell"> Vends tes articles</button>
    </header>
  );
};
export default Header;
