import Cookies from "js-cookie";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
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
  setToPublish,
  getCookie,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
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
              if (location.pathname === "/publish") {
                navigate("/");
              }
              window.location.reload();
              setDisplay(0);
            }}
          >
            Se déconnecter
          </button>
        </div>
        <div className="button-sell-div">
          <NavLink to={cookie ? "/publish" : "/login"}>
            <button
              className="button-sell"
              onClick={() => {
                setDisplay(0);
                setToPublish(true);
                getCookie();
              }}
            >
              Vends tes articles
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default ModalConnection;
