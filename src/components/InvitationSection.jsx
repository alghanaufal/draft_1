import React from "react";

const InvitationSection = ({ ref1, inView1, bgImage }) => {
  return (
    // Invitation section
    <div
      className="h-screen flex flex-col items-center justify-center text-center p-8 relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        className="flex flex-col justify-center items-center min-h-screen m-4"
        ref={ref1}
      >
        <img
          src="/bunga2.png"
          alt="Bunga"
          className={`absolute top-1 -left-12 w-54 h-54 transform -rotate-26 animate-sway ${
            inView1 ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
        />
        <img
          src="/bunga2.png"
          alt="Bunga"
          className={`absolute top-1 -right-12 w-54 h-54 transform rotate-26 animate-sway ${
            inView1 ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
        />
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-lg w-full relative">
          <img
            src="/1.jpeg"
            alt="Mountain"
            className="w-full h-100 object-cover"
          />
          <div className="p-6">
            <p
              className={`text-gray-700 text-justify leading-tight mb-4 ${
                inView1 ? "animate-fade-in-scale" : ""
              }`}
            >
              "Dan di antara tanda tanda (kebesaran) Nya ialah dia menciptakan
              pasangan-pasangan untukmu dari jenismu sendiri, agar kamu
              cenderung dan merasa tentram kepadanya, dan dia menjadikan di
              antara mu rasa kasih dan sayang. Sungguh, pada yang demikian itu
              benar benar terdapat tanda tanda (kebesaran Allah) bagi kaum yg
              berpikir"
            </p>
            <h2
              className={`text-2xl font-bold text-gray-800 mb-2 ${
                inView1 ? "animate-fade-in-scale" : ""
              }`}
            >
              Ar Rum ayat 21
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationSection;
