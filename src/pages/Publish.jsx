import axios from "axios";
import { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const Publish = ({ cookie, getCookie }) => {
  const navigate = useNavigate();
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [marque, setMarque] = useState("");
  const [taille, setTaille] = useState("");
  const [couleur, setCouleur] = useState("");
  const [etat, setEtat] = useState("");
  const [lieu, setLieu] = useState("");
  const [prix, setPrix] = useState(0);
  const [echange, setEchange] = useState(false);
  const [paths, setPaths] = useState([]);
  const [picture, setPicture] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append("title", titre);
    formdata.append("description", description);
    formdata.append("price", prix);
    formdata.append("condition", etat);
    formdata.append("city", lieu);
    formdata.append("brand", marque);
    formdata.append("size", taille);
    formdata.append("color", couleur);

    picture.map((file) => {
      return formdata.append("picture", file);
    });

    try {
      getCookie();
      setIsSubmitting(true);
      const { data } = await axios.post(
        "https://site--vinted-backend--7pddggdgmnqf.code.run/offer/publish",
        formdata,
        {
          headers: {
            authorization: `Bearer ${cookie}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log("catch >>>>", error.response);
    }
    setIsSubmitting(false);
  };

  return (
    <main className="main-form-pub">
      <form className="container publish-form" onSubmit={onSubmit}>
        <h1>Vends ton article</h1>

        <Dropzone
          onDrop={(acceptedFiles) => {
            setPicture(acceptedFiles);
            console.log(picture);
            setPaths(acceptedFiles.map((file) => URL.createObjectURL(file)));
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section className="label-picture">
              <div className="publish-label-picture" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>
                  <FontAwesomeIcon icon={faPlus} /> Ajoute une photo
                </p>
              </div>
              <div className="preview">
                {paths.map((path) => {
                  return (
                    <div key={path} className="preview-picture">
                      <img src={path} />
                    </div>
                  );
                })}{" "}
              </div>
            </section>
          )}
        </Dropzone>

        <label htmlFor="" className="label-publish">
          <label htmlFor="title">
            <p>Titre</p>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="ex: Chemise verte"
              onChange={(event) => {
                setTitre(event.target.value);
              }}
            />
          </label>
          <label htmlFor="description">
            <p>Décris ton article</p>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="ex: Porté quelquefois, taille correctement"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </label>
        </label>
        <label htmlFor="" className="label-publish">
          <label htmlFor="marque">
            <p>Marque</p>
            <input
              type="text"
              id="marque"
              name="marque"
              placeholder="ex: Zara"
              onChange={(event) => {
                setMarque(event.target.value);
              }}
            />
          </label>
          <label htmlFor="taille">
            <p>Taille</p>
            <input
              type="text"
              id="taille"
              name="taille"
              placeholder="ex: L / 40 / 12"
              onChange={(event) => {
                setTaille(event.target.value);
              }}
            />
          </label>
          <label htmlFor="couleur">
            <p>Couleur</p>
            <input
              type="text"
              id="couleur"
              name="couleur"
              placeholder="ex: Fushia"
              onChange={(event) => {
                setCouleur(event.target.value);
              }}
            />
          </label>
          <label htmlFor="etat">
            <p>État</p>
            <input
              type="text"
              id="etat"
              name="etat"
              placeholder="ex: Neuf avec étiquette"
              onChange={(event) => {
                setEtat(event.target.value);
              }}
            />
          </label>
          <label htmlFor="lieu">
            <p>Lieu</p>
            <input
              type="text"
              name="lieu"
              id="lieu"
              placeholder="ex: Paris"
              onChange={(event) => {
                setLieu(event.target.value);
              }}
            />
          </label>
        </label>

        <label htmlFor="prix" className="label-publish-prix">
          <p>Prix</p>

          <div className="echange">
            <input
              type="number"
              name="prix"
              id="prix"
              step="any"
              placeholder="ex: 0,00 €"
              onChange={(event) => {
                setPrix(event.target.value);
              }}
            />
            <label htmlFor="echange">
              <input
                type="checkbox"
                name="echange"
                id="echange"
                checked={echange}
                onChange={() => {
                  setEchange(!echange);
                }}
              />
              <p>Je suis intéressé(e) par les échanges</p>
            </label>
          </div>
        </label>
        <div className="button-add">
          <button className="button-add-publish" disabled={isSubmitting}>
            Ajouter
          </button>
        </div>
      </form>
      {isSubmitting && (
        <section className="absolute">
          <div className="loading loader"></div>
        </section>
      )}
    </main>
  );
};
export default Publish;
