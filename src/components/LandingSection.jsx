import React from "react";

const LandingSection = ({ guestName, handleScroll }) => {
  return (
    // Bagian Landing
    <div className="bg-cover bg-center min-h-screen flex items-center justify-center p-4 w-full relative">
      <div
        className="rounded-3xl border-4 border-white shadow-lg flex flex-col items-center justify-center text-center animate-fade-in w-full max-w-md p-10"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          boxShadow: "0 0 10px #FF8C00, 0 0 30px #FFD700",
        }}
      >
        <div
          className="w-42 md:w-58 max-w-md bg-white rounded-t-full shadow-lg relative"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            boxShadow: "0 0 10px #FF8C00, 0 0 30px #FFD700",
          }}
        >
          <img
            src="/chibi.PNG"
            alt="Nofridho & Nadya"
            className="w-full h-full object-cover animate-pull-in block mx-auto"
          />
        </div>
        <h2 className="text-sm text-gray-500 m-2 animate-fade-in-up">
          THE WEDDING OF
        </h2>
        <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 animate-fade-in-scale animate-letter-spacing">
          NOFRIDHO <br />&<br /> NADYA
        </h1>
        <p
          className="text-gray-600 mb-4 animate-fade-in-up"
          style={{ animationDelay: "0.8s", zIndex: 100 }}
        >
          Kepada Yth.
          <br />
          <span className="font-semibold font-serif">{guestName}</span>
        </p>
        <p
          className="text-sm text-gray-500 mb-6 mx-2 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          Dengan hormat, kami mengundang Anda untuk menghadiri pernikahan kami.
        </p>
        <button
          onClick={handleScroll}
          className="bg-white text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 transition animate-fade-in-up z-[9999]"
          style={{ animationDelay: "0.8s" }}
        >
          Buka Undangan
        </button>
      </div>
      <img
        src="/rumahgadang2.png"
        alt="Nofridho & Nadya"
        className="w-52 md:w-64 md:h-32 absolute -bottom-18 md:-bottom-16 left-1/2 transform -translate-x-1/2 animate-zoom-in"
      />
    </div>
  );
};

export default LandingSection;
