import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = ({
  setUserToken,
  setConnected,
  userName,
  setUserName,
  setOfferId,
}) => {
  const navigate = useNavigate();
  setOfferId(true);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!userEmail || !userPassword || !userName) {
        setErrorMessage("Veuillez remplir tous les champs");
        return;
      }
      setIsSubmitting(true);
      const { data } = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",

        {
          username: userName,
          email: userEmail,
          password: userPassword,
          newsletter: newsletter,
        }
      );

      setUserToken(data.token);
      console.log(data);
      Cookies.set(userName + "Token", data.token);
      setConnected(true);
      setOfferId(false);
      navigate("/");
    } catch (error) {
      console.log("Offer page - catch >", error.response);
    }
    setIsSubmitting(false);
  };

  return (
    <main>
      <form className="sign-up" onSubmit={onSubmit}>
        <h1>S'inscrire</h1>
        <div className="user-inf">
          <label htmlFor="userName">
            <input
              type="text"
              id="userName"
              placeholder="Nom d'utilisateur"
              value={userName}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
          </label>
          <label htmlFor="userEmail">
            <input
              type="text"
              id="userEmail"
              required
              placeholder="Email"
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
              placeholder="Mot de passe"
              value={userPassword}
              onChange={(event) => {
                setUserPassword(event.target.value);
              }}
            />
          </label>
        </div>

        <label htmlFor="check">
          <div className="check-signup">
            <input
              className="inp-check"
              type="checkbox"
              name=""
              id="check"
              checked={newsletter}
              onChange={(event) => {
                setNewsletter(!newsletter);
              }}
            />
            S'inscrire à notre newsletter
          </div>
          <span className="span-check">
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidencialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </span>
        </label>
        <button className="signup-button" disabled={isSubmitting}>
          S'inscrire
        </button>
        <a href="/login" className="to-login">
          Tu as déja un compte ? Connecte-toi !
        </a>
      </form>
    </main>
  );
};
export default Signup;
