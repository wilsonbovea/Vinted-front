import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
const ModalConnection = ({
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
          <FontAwesomeIcon icon={faX} />
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
                setDisplay(0);
              }}
            >
              S'inscrire
            </button>
          </NavLink>
          <NavLink to="/login">
            <button
              onClick={() => {
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
            }}
          >
            Se déconnecter
          </button>
        </div>
        <div className="button-sell-div">
          <NavLink to="/publish">
            <button className="button-sell" onClick={() => setDisplay(0)}>
              Vends tes articles
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default ModalConnection;
