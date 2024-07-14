import Hero from "../components/Hero";
import { NavLink } from "react-router-dom";

const HomePage = ({ dataOrg, setOfferId }) => {
  return (
    <main>
      <Hero />
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
                  return setOfferId(true);
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
  );
};
export default HomePage;

// {
//   "_id": "66699ae139e3cc553b5458f0",
//   "product_name": "Vestido",
//   "product_description": "Vestido camisero estampado, tegido fluido satinado, talla S.",
//   "product_price": 25,
//   "product_details": [
//       {
//           "MARQUE": "STRADIVARIUS"
//       },
//       {
//           "ÉTAT": "NEUF AVEC ÉTIQUETTE"
//       },
//       {
//           "COULEUR": "MULTICOLORE"
//       },
//       {
//           "EMPLACEMENT": " ANDALUCÍA, ESPAÑA"
//       }
//   ],
//   "product_pictures": [
//       {
//           "asset_id": "f0d07672c9c1a6238f0f4d47f0c911c8",
//           "public_id": "api/vinted-v2/offers/66699ae139e3cc553b5458f0/zjwykyswdmwmv02zupoj",
//           "version": 1718196962,
//           "version_id": "731483828e94235fdc345c4ab88dc8f6",
//           "signature": "19aad0e5c012567fc0aa822b3eb6cf425b1df112",
//           "width": 321,
//           "height": 800,
//           "format": "jpg",
//           "resource_type": "image",
//           "created_at": "2024-06-12T12:56:02Z",
//           "tags": [],
//           "bytes": 82936,
//           "type": "upload",
//           "etag": "b4cd79f0e0466d2b5e1da656e07763a1",
//           "placeholder": false,
//           "url": "http://res.cloudinary.com/lereacteur/image/upload/v1718196962/api/vinted-v2/offers/66699ae139e3cc553b5458f0/zjwykyswdmwmv02zupoj.jpg",
//           "secure_url": "https://res.cloudinary.com/lereacteur/image/upload/v1718196962/api/vinted-v2/offers/66699ae139e3cc553b5458f0/zjwykyswdmwmv02zupoj.jpg",
//           "folder": "api/vinted-v2/offers/66699ae139e3cc553b5458f0",
//           "access_mode": "public",
//           "original_filename": "1644244740_xwwygk",
//           "api_key": "361833749344571"
//       }
//   ],
//   "owner": {
//       "account": {
//           "username": "Leonel.Huels99",
//           "avatar": {
//               "asset_id": "c65be8ce0393ac7f4caf2179c84a4a65",
//               "public_id": "api/vinted-v2/users/66699ad839e3cc553b5458ca/avatar",
//               "version": 1718196952,
//               "version_id": "6701ce19e856eedf32e9b44483ba5352",
//               "signature": "c4c31ce8315c52dddfff70119a7aac3a200986c9",
//               "width": 420,
//               "height": 420,
//               "format": "png",
//               "resource_type": "image",
//               "created_at": "2024-06-12T12:55:52Z",
//               "tags": [],
//               "bytes": 1540,
//               "type": "upload",
//               "etag": "4b33208972aa5f262edbaeee643d35cf",
//               "placeholder": false,
//               "url": "http://res.cloudinary.com/lereacteur/image/upload/v1718196952/api/vinted-v2/users/66699ad839e3cc553b5458ca/avatar.png",
//               "secure_url": "https://res.cloudinary.com/lereacteur/image/upload/v1718196952/api/vinted-v2/users/66699ad839e3cc553b5458ca/avatar.png",
//               "folder": "api/vinted-v2/users/66699ad839e3cc553b5458ca",
//               "access_mode": "public",
//               "original_filename": "13870000",
//               "api_key": "361833749344571"
//           }
//       },
//       "_id": "66699ad839e3cc553b5458ca"
//   },
//   "product_image": {
//       "asset_id": "e8362fe44aa8413324e7b8ad33271d73",
//       "public_id": "api/vinted-v2/offers/66699ae139e3cc553b5458f0/preview",
//       "version": 1718196961,
//       "version_id": "d8a95f706647a223941099cf4d7e6d88",
//       "signature": "1e89df03c44efd5b81e2d5baa2c55e4b8d183532",
//       "width": 321,
//       "height": 800,
//       "format": "jpg",
//       "resource_type": "image",
//       "created_at": "2024-06-12T12:56:01Z",
//       "tags": [],
//       "bytes": 82936,
//       "type": "upload",
//       "etag": "b4cd79f0e0466d2b5e1da656e07763a1",
//       "placeholder": false,
//       "url": "http://res.cloudinary.com/lereacteur/image/upload/v1718196961/api/vinted-v2/offers/66699ae139e3cc553b5458f0/preview.jpg",
//       "secure_url": "https://res.cloudinary.com/lereacteur/image/upload/v1718196961/api/vinted-v2/offers/66699ae139e3cc553b5458f0/preview.jpg",
//       "folder": "api/vinted-v2/offers/66699ae139e3cc553b5458f0",
//       "access_mode": "public",
//       "original_filename": "1644244740_xwwygk",
//       "api_key": "361833749344571"
//   },
//   "product_date": "2024-06-12T12:56:01.394Z",
//   "__v": 0
// }
