import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import OfferPage from "./pages/OfferPage";
import axios from "axios";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const [dataOrg, setDataOrg] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [offerId, setOfferId] = useState(true);
  const [connected, setConnected] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [userName, setUserName] = useState("");
  const [search, setSearch] = useState("");
  console.log("app log >>>>>>", dataOrg);
  const tabData = [];
  for (let i = 0; i < dataOrg.length; i++) {
    if (
      dataOrg[i].product_description.includes(search) ||
      dataOrg[i].product_name.includes(search) ||
      dataOrg[i].product_details[0].MARQUE.includes(search.toLocaleUpperCase())
    ) {
      if (tabData.length < 20) {
        tabData.push(dataOrg[i]);
      } else {
        break;
      }
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );

        setDataOrg(data.offers);
      } catch (error) {
        console.log("catch >>>>", error.message);
      }
      setIsLoading(false);
      setOfferId(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <div className="loading loader"></div>
  ) : (
    <Router>
      <Header
        offerId={offerId}
        setOfferId={setOfferId}
        connected={connected}
        setConnected={setConnected}
        userToken={userToken}
        setUserToken={setUserToken}
        userName={userName}
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route
          path="/"
          element={<HomePage dataOrg={tabData} setOfferId={setOfferId} />}
        />
        <Route
          path="/offers/:id"
          element={<OfferPage setOfferId={setOfferId} offerId={offerId} />}
        />
        <Route
          path="/signup"
          element={
            <Signup
              setConnected={setConnected}
              setUserToken={setUserToken}
              userName={userName}
              setUserName={setUserName}
              setOfferId={setOfferId}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setConnected={setConnected}
              setUserToken={setUserToken}
              setUserName={setUserName}
              setOfferId={setOfferId}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
