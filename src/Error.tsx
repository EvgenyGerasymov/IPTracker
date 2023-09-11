import React from "react";

interface Props {
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}

function Error(props: Props) {
  return (
    <>
      <div className="absolute top-1/2 left-0 right-0 md:mx-auto flex flex-col justify-center items-center w-fit mx-10 bg-veryDarkGrey p-10 gap-4 rounded-lg z-30">
        <p className="text-center text-white">
          Sorry,it looks like there was an issue with getting the data
        </p>
        <p className="text-center text-white">Try to change the IP adress</p>
        <button
          className="w-full mx-10 px-2 rounded-lg  text-veryDarkGrey bg-DarkGrey"
          onClick={() => {
            props.setError(false);
          }}
        >
          Ok
        </button>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gray-600 z-20 bg-opacity-70"></div>
    </>
  );
}

export default Error;
