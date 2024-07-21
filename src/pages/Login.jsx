import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
const Login = ({
  setConnected,
  setUserToken,
  setUserName,
  toPublish,
  setToPublish,
  getCookie,
}) => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!userEmail || !userPassword) {
        return setErrorMessage("Veuillez remplir tous les champs");
      }
      setIsSubmitting(true);
      const { data } = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",

        {
          email: userEmail,
          password: userPassword,
        }
      );

      setUserToken(data.token);
      setUserName(data.account.username);

      setConnected(true);
      setToPublish(true);
      Cookies.set("userToken", data.token);

      if (toPublish) {
        navigate("/publish");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("Offer page - catch >", error.response);
      setErrorMessage("le mot de passe ou l'e-mail sont incorrects");
    }
    getCookie();
    setIsSubmitting(false);
  };

  return (
    <main>
      <form className="sign-up" onSubmit={onSubmit}>
        <h1>Se connecter</h1>
        <div className="user-inf">
          <label htmlFor="userEmail">
            <input
              type="text"
              id="userEmail"
              name="userEmail"
              required
              placeholder="Adresse Email"
              value={userEmail}
              onChange={(event) => {
                setUserEmail(event.target.value);
              }}
            />
          </label>
          <label htmlFor="userPassword">
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              placeholder="Mot de passe"
              value={userPassword}
              onChange={(event) => {
                setUserPassword(event.target.value);
              }}
            />
          </label>
        </div>
        <span className="error-message"> {errorMessage}</span>
        <button className="signup-button" type="submit" disabled={isSubmitting}>
          S'inscrire
        </button>
        <NavLink to="/signup" className="to-login">
          <p>Pas encore de compte ? Inscris-toi !</p>
        </NavLink>
      </form>
    </main>
  );
};
export default Login;
