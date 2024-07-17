import Hero from "../components/Hero";
import { NavLink } from "react-router-dom";

const HomePage = ({ dataOrg, setOfferId }) => {
  return (
    <>
      <Hero />
      <main className="container">
        <section className="container section-offers">
          {dataOrg.map((offer, index) => {
            const avatar = offer.owner.account.avatar;

            return (
              <div key={offer._id} className="all-offer container">
                <div className="avatar">
                  <img
                    src={
                      avatar && avatar.secure_url
                        ? avatar.secure_url
                        : "/user-img.png"
                    }
                    alt=""
                  />

                  <span>{offer.owner.account.username}</span>
                </div>
                <NavLink
                  className="nav-offer"
                  onClick={() => {
                    return setOfferId(1);
                  }}
                  to={"/offers/" + offer._id}
                >
                  <div className="offer-img">
                    <img src={offer.product_image.secure_url} alt="" />
                  </div>
                  <p>{offer.product_price + " €"}</p>
                  <span>
                    {offer.product_details.map((detail) => {
                      return detail.TAILLE;
                    })}
                  </span>
                  <br />
                  <span>
                    {offer.product_details.map((detail) => {
                      return detail.MARQUE;
                    })}
                  </span>
                </NavLink>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
};
export default HomePage;
