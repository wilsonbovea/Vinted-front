import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

const ModalConnection = ({
  setOfferId,
  setConnected,
  connected,
  cookie,
  setCookie,
  display,
  setDisplay,
  setUserToken,
}) => {
  return (
    <div className={display === 0 ? "hidden-button" : "modal-root"}>
      <div className="modalConnection">
        <button
          className="modal-x"
          onClick={() => {
            setDisplay(0);
          }}
        >
          X
        </button>
        <div
          className={
            connected === false && cookie === undefined
              ? "buttons-connection"
              : "hidden-button"
          }
        >
          <NavLink to="/signup">
            <button
              onClick={() => {
                setOfferId(1);
                setDisplay(0);
              }}
            >
              S'inscrire
            </button>
          </NavLink>
          <NavLink to="/login">
            <button
              onClick={() => {
                setOfferId(1);
                setDisplay(0);
              }}
            >
              Se connecter
            </button>
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
              setDisplay(0);
              setOfferId(0);
            }}
          >
            Se déconnecter
          </button>
        </div>
        <button className="button-sell">Vends tes articles</button>
      </div>
    </div>
  );
};
export default ModalConnection;
