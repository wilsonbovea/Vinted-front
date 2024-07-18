import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

const ModalConnection = ({
  setOfferId,
  setConnected,
  connected,
  cookie,
  setCookie,
  display,
}) => {
  return (
    <div className={display === 0 ? "hidden-button" : "modalConnection"}>
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
      <button className="button-sell">Vends tes articles</button>
    </div>
  );
};
export default ModalConnection;
