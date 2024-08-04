import { NavLink } from "react-router-dom";

const Hero = ({ cookie, setToPublish }) => {
  return (
    <div className="hero">
      <div className="hero-image">
        <img src="/hero-img.jpg" alt="femme souriante" />
      </div>
      <div className="start">
        <div className="container">
          <div className="hero-start-sell">
            <div className="div-start">
              <h2>Prêts à faire du tri dans vos placards ?</h2>
              <NavLink to={cookie ? "/publish" : "/login"}>
                <button
                  className="button-start"
                  onClick={() => setToPublish(true)}
                >
                  Commencer à vendre
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
