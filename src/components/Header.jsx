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
}) => {
  return (
    <header
      className={offerId === false ? "container headerAndFilter" : "container"}
    >
      <div className="logo-vinted">
        <NavLink to="/" onClick={() => setOfferId(false)}>
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
        <div> {offerId === false && <div className="filter-barre"></div>}</div>
      </div>
      <div
        className={connected === false ? "buttons-connection" : "hidden-button"}
      >
        <NavLink to="/signup">
          <button onClick={() => setOfferId(true)}>S'inscrire</button>
        </NavLink>
        <NavLink to="/login">
          <button onClick={() => setOfferId(true)}>Se connecter</button>
        </NavLink>
      </div>
      <div
        className={connected === true ? "button-disconnect" : "hidden-button"}
      >
        <button
          onClick={() => {
            Cookies.remove(userName + "Token");
            // Mise à jour du state pour qu'il reflète tout de suite le changement
            setUserToken("");

            setConnected(false);
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
