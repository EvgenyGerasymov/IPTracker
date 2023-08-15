import React, { useEffect, useState } from "react";
import Map from "./Map";
import Form from "./Form";
import LoadingGIF from "./images/Loading_icon.gif";
import { useLoadScript } from "@react-google-maps/api";
import Error from "./Error";

import "./index.css";
import axios from "axios";
function App() {
  const [error, setError] = useState<boolean>(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  });
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  useEffect(() => {
    axios.get("https://ipapi.co/json/").then((res) => {
      setLat(res.data?.latitude);
      setLng(res.data?.longitude);
    });
  }, []);
  return (
    <div className="App">
      <div className="">
        <div className="bg-bgMobile sm:bg-bgDesktop bg-no-repeat bg-cover w-full pt-4 pb-36 px-6 ">
          <div>
            <h1 className="text-3xl text-white text-center pb-5">
              IP Address Tracker
            </h1>
            <Form setLat={setLat} setLng={setLng} setError={setError} />
          </div>
        </div>
      </div>
      {isLoaded ? (
        <Map lat={lat} lng={lng} />
      ) : (
        <img src={LoadingGIF} alt="" className="w-full" />
      )}
      {error && <Error error={error} setError={setError} />}
    </div>
  );
}

export default App;
