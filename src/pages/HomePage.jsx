import Hero from "../components/Hero";
import { NavLink } from "react-router-dom";

const HomePage = ({ dataOrg, cookie, setToPublish }) => {
  return (
    <>
      <Hero cookie={cookie} setToPublish={setToPublish} />
      <main className="container">
        <section className="section-offers">
          {dataOrg.map((offer, index) => {
            // console.log(offer);
            const avatar = offer.owner.account;

            return (
              <div key={offer._id} className="all-offer">
                <div className="avatar">
                  <img
                    src={
                      avatar && avatar.avatar && avatar.secure_url
                        ? avatar.secure_url
                        : "/user-img.png"
                    }
                    alt=""
                  />

                  <span>{offer.owner.account.username}</span>
                </div>
                <NavLink className="nav-offer" to={"/offers/" + offer._id}>
                  <div className="offer-img">
                    <img src={offer.product_image.secure_url} alt="" />
                  </div>
                  <div>
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
                  </div>
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
