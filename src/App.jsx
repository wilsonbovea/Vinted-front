import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import OfferPage from "./pages/OfferPage";
import axios from "axios";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cookies from "js-cookie";

function App() {
  const [dataOrg, setDataOrg] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [offerId, setOfferId] = useState(0);
  const [connected, setConnected] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [userName, setUserName] = useState("");
  const [search, setSearch] = useState("");
  const [cookie, setCookie] = useState("");
  const [counter, setCounter] = useState([0, 1000]);
  const [checked, setChecked] = useState("");

  const getCookie = () => {
    const token = Cookies.get("userToken");

    setCookie(token);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers?title=" +
            search +
            "&priceMin=" +
            counter[0] +
            "&priceMax=" +
            counter[1] +
            "&sort=" +
            checked
        );

        setDataOrg(data.offers);
      } catch (error) {
        console.log("catch >>>>", error.message);
      }

      setIsLoading(false);
    };
    getCookie();
    fetchData();
  }, [search, counter[0], counter[1], checked]);

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
        cookie={cookie}
        setCookie={setCookie}
        counter={counter}
        setCounter={setCounter}
        setChecked={setChecked}
      />
      <Routes>
        <Route
          path="/"
          element={<HomePage dataOrg={dataOrg} setOfferId={setOfferId} />}
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
