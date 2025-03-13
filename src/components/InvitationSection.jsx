import React from "react";

const InvitationSection = ({ ref1, inView1, bgImage }) => {
  return (
    // Invitation section
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center p-4 relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="flex flex-col justify-center items-center min-h-screen m-4 relative"
        ref={ref1}
      >
        {/* Bunga di sebelah kiri */}
        <img
          src="/bunga2.png"
          alt="Bunga"
          className={`absolute top-4 -left-6 w-44 h-44 md:w-52 md:h-52 transform -rotate-26 animate-sway z-10 ${
            inView1 ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
        />
        {/* Bunga di sebelah kanan */}
        <img
          src="/bunga2.png"
          alt="Bunga"
          className={`absolute top-4 -right-6 w-44 h-44 md:w-52 md:h-52 transform rotate-26 animate-sway z-10 ${
            inView1 ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
        />
        {/* Konten undangan */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-lg w-full relative z-0">
          <img
            src="/1.jpeg"
            alt="Mountain"
            className="w-full h-68 md:h-74 object-cover"
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
