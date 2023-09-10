import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IP {
  ip: string;
}
interface ipData {
  ip: number;
  location: string;
  timezone: string;
  isp: string;
}
interface Props {
  setLat: React.Dispatch<React.SetStateAction<number>>;
  setLng: React.Dispatch<React.SetStateAction<number>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}

function Form(props: Props) {
  const [ipAdress, setIpAdress] = useState<string | null>(null);
  const [ipData, setIpData] = useState<ipData | null>(null);

  useEffect(() => {
    if (ipAdress) {
      axios
        .get(
          `https://geo.ipify.org/api/v2/country?apiKey=${process.env.REACT_APP_IPIFI_API_KEY}&ipAddress=${ipAdress}`
        )
        .then((res) => {
          setIpData({
            ip: res.data?.ip,
            location: `${res.data?.location.country},${res.data?.location.region} ${res.data?.as.asn}`,
            timezone: `${res.data?.location.timezone}`,
            isp: `${res.data.isp}`,
          });
          return axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${res.data?.location.region}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
          );
        })
        .then((res) => {
          props.setLat(res.data?.results[0].geometry.location.lat);
          props.setLng(res.data?.results[0].geometry.location.lng);
        })
        .catch((e) => {
          props.setError(true);
        });
    }
  }, [ipAdress]);
  const schema = yup.object().shape({
    ip: yup
      .string()
      .matches(
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        "Wrong format"
      )
      .required("Enter Ip Adress"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: IP) => {
    setIpAdress(data.ip);
  };
  const HoveringData = () => {
    return (
      <div className="bg-white rounded-lg mt-10 flex flex-col md:flex-row  md:px-5 gap-6 py-5 sm:pt-8 sm:pb-14 justify-center items-center md:items-start absolute top-30 left-0 right-0 mx-10 lg:mx-auto text-center md:text-left lg:max-w-[60%] z-10">
        <div>
          <h2 className="text-xs font-extrabold text-DarkGrey sm:mb-2 ">
            IP ADRESS
          </h2>
          <p className="text-xl font-extrabold  text-veryDarkGrey">
            {ipData?.ip || "-"}
          </p>
        </div>
        <span className="hidden md:block w-[1px] h-10 bg-DarkGrey"></span>
        <div>
          <h2 className="text-xs font-extrabold text-DarkGrey sm:mb-2 ">
            LOCATION
          </h2>
          <p className="text-xl font-extrabold  text-veryDarkGrey">
            {ipData?.location || "-"}
          </p>
        </div>
        <span className="hidden md:block w-[1px] h-10 bg-DarkGrey"></span>

        <div>
          <h2 className="text-xs font-extrabold text-DarkGrey sm:mb-2 ">
            TIMEZONE
          </h2>
          <p className="text-xl font-extrabold  text-veryDarkGrey">
            {ipData?.timezone || "-"}
          </p>
        </div>
        <span className="hidden md:block w-[1px] h-10 bg-DarkGrey"></span>

        <div>
          <h2 className="text-xs font-extrabold text-DarkGrey sm:mb-2 ">ISP</h2>
          <p className="text-xl font-extrabold  text-veryDarkGrey">
            {ipData?.isp || "-"}
          </p>
        </div>
      </div>
    );
  };
  return (
    <section>
      <form
        className="flex items-center justify-center relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-red-500 absolute -top-6">{errors.ip?.message}</p>
        <input
          type="text"
          placeholder="Enter ip adress"
          className=" h-12 rounded-l-lg inline-block w-full outline-none pl-3 md:max-w-[40%]"
          {...register("ip")}
        />
        <button className="bg-veryDarkGrey hover:bg-DarkGrey w-16 h-12 rounded-r-lg before:content-[''] before:w-5 before:h-5  before:bg-iconArrow before:bg-no-repeat before:bg-contain before:block before:ml-5"></button>
      </form>
      {ipData && HoveringData()}
    </section>
  );
}

export default Form;
