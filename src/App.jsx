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
import ModalConnection from "./components/ModalConnection";
import Publish from "./pages/Publish";

function App() {
  const [dataOrg, setDataOrg] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [userName, setUserName] = useState("");
  const [search, setSearch] = useState("");
  const [cookie, setCookie] = useState("");
  const [counter, setCounter] = useState([0, 2000]);
  const [checked, setChecked] = useState("");
  const [display, setDisplay] = useState(0);
  const [toPublish, setToPublish] = useState(false);
  console.log(toPublish);
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
  }, [search, counter[0], counter[1], checked, cookie]);

  return isLoading ? (
    <div className="loading loader"></div>
  ) : (
    <Router>
      <Header
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
        setDisplay={setDisplay}
        toPublish={toPublish}
        setToPublish={setToPublish}
        getCookie={getCookie}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              dataOrg={dataOrg}
              cookie={cookie}
              setToPublish={setToPublish}
            />
          }
        />
        <Route path="/offers/:id" element={<OfferPage />} />
        <Route
          path="/signup"
          element={
            <Signup
              setConnected={setConnected}
              setUserToken={setUserToken}
              userName={userName}
              setUserName={setUserName}
              toPublish={toPublish}
              setToPublish={setToPublish}
              getCookie={getCookie}
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
              toPublish={toPublish}
              setToPublish={setToPublish}
              getCookie={getCookie}
            />
          }
        />
        <Route
          path="/publish"
          element={<Publish cookie={cookie} getCookie={getCookie} />}
        />
      </Routes>
      <ModalConnection
        setConnected={setConnected}
        connected={connected}
        cookie={cookie}
        setCookie={setCookie}
        display={display}
        setDisplay={setDisplay}
        setUserToken={setUserToken}
        toPublish={toPublish}
        setToPublish={setToPublish}
        getCookie={getCookie}
      />
    </Router>
  );
}

export default App;
