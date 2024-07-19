import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = ({ setConnected, setUserToken, setUserName, setOfferId }) => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!userEmail || !userPassword) {
        setErrorMessage("Veuillez remplir tous les champs");
        return;
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

      Cookies.set("userToken", data.token);
      setOfferId(0);
      navigate("/");
    } catch (error) {
      console.log("Offer page - catch >", error.response);
    }
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
        <button className="signup-button" disabled={isSubmitting}>
          S'inscrire
        </button>
        <a href="/signup" className="to-login">
          Pas encore de compte ? Inscris-toi !
        </a>
      </form>
    </main>
  );
};
export default Login;
