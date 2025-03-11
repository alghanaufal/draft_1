import React from "react";

const EventSection = ({ ref6, inView6, bgImage }) => {
  return (
    <div
      ref={ref6} // Gunakan ref6 untuk memantau container
      className="flex flex-col items-center p-12"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Bagian Akad Nikah */}
      <div
        className={`w-full max-w-md bg-white rounded-t-full shadow-lg relative text-center px-6 p-28 ${
          inView6 ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        <h2 className="text-lg font-serif font-semibold mt-2">AKAD NIKAH</h2>
        <p className="text-gray-600 mt-2 font-serif font-medium">
          Sabtu, 03 Mei 2025
        </p>
        <p className="text-gray-600">10.00 WIB - Selesai</p>
        <p className="text-gray-600">
          Perumahan Pondok Timur Indah 1, jalan Harimau III no.81A RT/RW 009/017
          Kel.Jatimulya Kec.Tambun Selatan Bekasi Timur 17510
        </p>

        {/* Lokasi Map */}
        <div className="mt-4 w-full flex justify-center">
          <a
            href="https://maps.app.goo.gl/nT3LnFo4xuWo3gMA8" // Link Google Maps
            target="_blank" // Buka di tab baru
            rel="noopener noreferrer" // Untuk keamanan
            className={`bg-amber-400 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 transition ${
              inView6 ? "animate-fade-in-up delay-100" : "opacity-0"
            }`}
          >
            Lokasi
          </a>
        </div>
      </div>

      {/* Bagian Resepsi Nikah */}
      <div
        className={`w-full max-w-md bg-white rounded-b-full shadow-lg relative text-center px-6 p-28 ${
          inView6 ? "animate-fade-in-up delay-200" : "opacity-0"
        }`}
      >
        <h2 className="text-lg font-serif font-semibold mt-2">RESEPSI NIKAH</h2>
        <p className="text-gray-600 mt-2 font-serif font-medium">
          Sabtu, 03 Mei 2025
        </p>
        <p className="text-gray-600">12.30 WIB - Selesai</p>
        <p className="text-gray-600">
          Perumahan Pondok Timur Indah 1, jalan Harimau III no.81A RT/RW 009/017
          Kel.Jatimulya Kec.Tambun Selatan Bekasi Timur 17510
        </p>
        {/* Lokasi Map */}
        <div className="mt-4 w-full flex justify-center">
          <a
            href="https://maps.app.goo.gl/nT3LnFo4xuWo3gMA8" // Link Google Maps
            target="_blank" // Buka di tab baru
            rel="noopener noreferrer" // Untuk keamanan
            className={`bg-amber-400 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 transition ${
              inView6 ? "animate-fade-in-up delay-300" : "opacity-0"
            }`}
          >
            Lokasi
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventSection;
