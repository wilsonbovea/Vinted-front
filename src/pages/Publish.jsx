import axios from "axios";
import { useState, useEffect } from "react";
const Publish = ({ cookie }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
          params,
          {
            headers: {
              authorization: `Bearer ${cookie}`,
            },
          }
        );
      } catch (error) {
        console.log("catch >>>>", error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <p>ROUTE PUBLISH</p>
    </div>
  );
};
export default Publish;
