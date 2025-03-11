import React from "react";

const InvitationSection = ({ ref1, inView1, bgImage }) => {
  return (
    // Invitation section
    <div
      className="h-screen flex flex-col items-center justify-center text-center p-8 relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Gambar dengan border lingkaran */}
      <div class="flex flex-col justify-center items-center min-h-screen m-4">
        <div class="bg-white rounded-3xl shadow-lg overflow-hidden max-w-lg w-full">
          <img src="/1.jpeg" alt="Mountain" class="w-full h-100 object-cover" />
          <div class="p-6" ref={ref1}>
            <p
              class={`text-gray-700 text-justify leading-tight mb-4 ${
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
              class={`text-2xl font-bold text-gray-800 mb-2 ${
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
