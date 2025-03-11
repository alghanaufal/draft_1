import React, { useState } from "react";

const GiftSection = ({ ref8, inView8, bgImage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      ref={ref8} // Gunakan ref8 untuk memantau container
      className="bg-orange-200 flex flex-col items-center p-12"
      // style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Judul */}
      <h2
        className={`text-2xl md:text-4xl font-serif font-bold drop-shadow-lg mb-2 ${
          inView8 ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        Wedding Gift
      </h2>
      <p
        className={`text-xs font-serif mb-22 ${
          inView8 ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        Klik Gift
      </p>

      {/* Card */}
      <div className="card">
        <div
          className={`relative bg-black w-[300px] sm:w-[350px] transition-all duration-700 aspect-video flex items-center justify-center ${
            isOpen ? "group" : ""
          } ${inView8 ? "animate-zoom-in" : "opacity-0"}`}
        >
          {/* Card Content */}
          <div
            className={`transition-all flex flex-col items-center py-5 justify-start duration-80 ${
              isOpen ? "-translate-y-16 duration-1000" : ""
            } bg-white w-full h-full absolute`}
          >
            <p className="text-xl sm:text-2xl font-semibold text-gray-500 font-serif">
              Lorem, ipsum.
            </p>
            <p className="px-10 text-[10px] sm:text-[12px] text-gray-700">
              Lorem ipsum dolor sit amet.
            </p>
            <p className="font-serif text-[10px] sm:text-[12px] text-gray-700">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>

          {/* Seal Button */}
          {/* Seal Button */}
          <button
            onClick={handleToggle}
            className={`seal bg-rose-300 text-rose-500 w-14 aspect-square rounded-full z-40 flex items-center justify-center font-semibold [clip-path:polygon(50%_0%,_80%_10%,_100%_35%,_100%_70%,_80%_90%,_50%_100%,_20%_90%,_0%_70%,_0%_35%,_20%_10%)] border-4 border-rose-400 transition-all duration-1000 ${
              isOpen ? "translate-y-3" : ""
            } ${inView8 ? "animate-fade-in-up delay-300" : "opacity-0"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6" // Sesuaikan ukuran dengan kebutuhan
            >
              <path d="M9.375 3a1.875 1.875 0 000 3.75h1.875v4.5H3.375A1.875 1.875 0 011.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0112 2.753a3.375 3.375 0 015.432 3.997h3.193c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 10-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3zM11.25 12.75H3v6.75a1.875 1.875 0 001.875 1.875h5.625V12.75zm1.5 0v8.625h5.625a1.875 1.875 0 001.875-1.875V12.75h-7.5z" />
            </svg>
          </button>

          {/* Top Triangle */}
          <div
            className={`tp transition-all duration-300 ${
              isOpen ? "duration-100" : ""
            } bg-orange-300 absolute w-full h-full ${
              isOpen
                ? "[clip-path:polygon(50%_0%,_100%_0,_0_0)]"
                : "[clip-path:polygon(50%_50%,_100%_0,_0_0)]"
            } ${inView8 ? "animate-fade-in-up delay-400" : "opacity-0"}`}
          ></div>

          {/* Left Triangle */}
          <div
            className={`lft transition-all duration-700 absolute w-full h-full bg-orange-400 [clip-path:polygon(50%_50%,_0_0,_0_100%)] ${
              isOpen ? "[clip-path:polygon(50%_0%,_0_0,_0_100%)]" : ""
            } ${inView8 ? "animate-fade-in-up delay-500" : "opacity-0"}`}
          ></div>

          {/* Right Triangle */}
          <div
            className={`rgt transition-all duration-700 absolute w-full h-full bg-orange-400 [clip-path:polygon(50%_50%,_100%_0,_100%_100%)] ${
              isOpen ? "[clip-path:polygon(50%_0%,_100%_0,_100%_100%)]" : ""
            } ${inView8 ? "animate-fade-in-up delay-600" : "opacity-0"}`}
          ></div>

          {/* Bottom Triangle */}
          <div
            className={`btm transition-all duration-700 absolute w-full h-full bg-orange-300 [clip-path:polygon(50%_50%,_100%_100%,_0_100%)] ${
              isOpen ? "[clip-path:polygon(50%_0%,_100%_100%,_0_100%)]" : ""
            } ${inView8 ? "animate-fade-in-up delay-700" : "opacity-0"}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default GiftSection;
