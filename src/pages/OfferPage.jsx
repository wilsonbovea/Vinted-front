import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { nanoid } from "nanoid";
const OfferPage = ({ setOfferId, offerId }) => {
  const { id } = useParams();
  setOfferId(true);
  const [offer, setOfferInfos] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offer/" + id
        );

        setOfferInfos(data);
      } catch (error) {
        console.log("Offer page - catch >", error.response);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);
  return isLoading ? (
    <div className="loading loader"></div>
  ) : (
    <section className="section-page-offer">
      <div className="page-offer">
        <div className="offer-page-img">
          <img src={offer.product_image.secure_url} alt="" />
        </div>
        <div className="details">
          <h1>{offer.product_price + " €"}</h1>
          {offer.product_details.map((desc) => {
            const keysPorduct = Object.keys(desc);
            return (
              <div className="div-desc" key={nanoid()}>
                {keysPorduct.map((keyName) => {
                  if (keyName !== "MODES DE PAIEMENT") {
                    return (
                      <div key={nanoid()}>
                        <span className="span1">{keyName}</span>
                        <span>{desc[keyName]}</span>
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}

          <div className="description">
            <h2>{offer.product_name}</h2>
            <p>{offer.product_description}</p>
            <div className="user">
              <img
                src={
                  offer.owner.account.avatar && offer.owner.account.avatar.url
                    ? offer.owner.account.avatar.url
                    : "/user-img.png"
                }
                alt=""
              />
              <span>{offer.owner.account.username}</span>
            </div>
          </div>
          <button className="buy-button">Acheter</button>
        </div>
      </div>
    </section>
  );
};
export default OfferPage;
