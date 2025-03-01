import { useRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import "./app.css";

const images = [
  "/1.jpeg",
  "/2.jpeg",
  "/3.jpeg",
  "/4.jpeg",
  "/5.jpeg",
  "/6.jpeg",
];

export default function App() {
  const inviteSectionRef = useRef(null);
  const eventDate = new Date("2025-05-03T09:00:00").getTime();
  const [bgImage, setBgImage] = useState(images[0]);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  const { ref, inView } = useInView({
    threshold: 0.1, // Pemicu saat 10% elemen terlihat
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImage((prev) => {
        const currentIndex = images.indexOf(prev);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  function getTimeLeft() {
    const now = new Date().getTime();
    const difference = eventDate - now;
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  const handleScroll = () => {
    inviteSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="relative min-h-screen bg-fixed bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay dengan opasitas 70% */}
      <div className="absolute inset-0 bg-black opacity-35"></div>

      {/* Konten */}
      <div className="relative flex-grow">
        {/* Bagian Landing */}
        <div
          className="bg-cover bg-center h-screen flex flex-col items-center justify-center text-center p-8 w-full"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <h2 className="text-sm text-gray-500 mb-2">THE WEDDING OF</h2>
          <h1 className="text-5xl font-serif font-bold mb-4">NOFRIDHO & NADYA</h1>
          <p className="text-gray-600 mb-4">
            Kepada Yth.
            <br />
            <span className="font-semibold font-serif">Tamu Undangan</span>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Dengan hormat, kami mengundang Anda untuk menghadiri pernikahan
            kami.
          </p>
          <div className="wrapper">
            <button className="button" onClick={handleScroll}>
              <svg className="svgIcon" viewBox="0 0 384 512">
                <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Undangan Section */}
        <div ref={inviteSectionRef} className="mb-12 text-center">
          {/* Bagian Ucapan */}
          <div className="h-screen flex flex-col items-center justify-center text-center p-8 relative">
            {/* Gambar dengan border lingkaran */}
            <div className="w-80 h-180 rounded-full overflow-hidden relative">
              <img
                src="/1.jpeg"
                alt="Nofridho & Nadya"
                className="w-full h-full object-cover"
              />
              {/* Teks ucapan di atas gambar dengan posisi tetap */}
              <div className="absolute top-1/4 transform -translate-y-1/2 justify-center text-white">
                <h2 className="text-lg font-serif font-semibold mb-2 text-center">
                  Assalamu'alaikum Wr. Wb
                </h2>
                <p className="text-sm text-center">
                  Tanpa mengurangi rasa hormat, kami mengundang
                  Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami.
                </p>
              </div>
            </div>
          </div>

          {/* Galeri Foto */}
          <div className="mb-12 p-10">
            <h3 className="text-xl font-serif font-bold mb-4">Galeri Kami</h3>
            <div
              ref={ref} // Ref untuk Intersection Observer
              className={`gallery ${inView ? "gallery-animate" : ""}`} // Tambahkan class animasi saat inView true
            >
              {images.map((img, index) => (
                <div key={index} className="gallery-item">
                  <img
                    src={img}
                    alt={`Foto ${index + 1}`}
                    className="gallery-img"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Countdown */}
          <div className="mb-12 text-center text-white">
            <h2 className="text-2xl md:text-4xl font-serif font-bold drop-shadow-lg">
              Wedding Day
            </h2>
            <p className="text-sm md:text-lg font-serif font-light mt-1 tracking-wide drop-shadow-md">
              03.05.2025
            </p>

            <div className="grid grid-cols-4 gap-2 md:gap-4 mt-6 justify-center">
              <div className="px-3 py-2 md:px-6 md:py-3 rounded-md text-center">
                <span className="text-xl md:text-3xl font-bold drop-shadow-lg">
                  {timeLeft.days}
                </span>
                <p className="text-xs md:text-sm mt-1 uppercase tracking-wider drop-shadow-md">
                  Days
                </p>
              </div>
              <div className="px-3 py-2 md:px-6 md:py-3 rounded-md text-center">
                <span className="text-xl md:text-3xl font-bold drop-shadow-lg">
                  {timeLeft.hours}
                </span>
                <p className="text-xs md:text-sm mt-1 uppercase tracking-wider drop-shadow-md">
                  Hours
                </p>
              </div>
              <div className="px-3 py-2 md:px-6 md:py-3 rounded-md text-center">
                <span className="text-xl md:text-3xl font-bold drop-shadow-lg">
                  {timeLeft.minutes}
                </span>
                <p className="text-xs md:text-sm mt-1 uppercase tracking-wider drop-shadow-md">
                  Minutes
                </p>
              </div>
              <div className="px-3 py-2 md:px-6 md:py-3 rounded-md text-center">
                <span className="text-xl md:text-3xl font-bold drop-shadow-lg">
                  {timeLeft.seconds}
                </span>
                <p className="text-xs md:text-sm mt-1 uppercase tracking-wider drop-shadow-md">
                  Seconds
                </p>
              </div>
            </div>
          </div>

          {/* Detail Acara */}
          <div className="flex flex-col items-center p-12">
            <div className="w-full max-w-md bg-white rounded-t-full shadow-lg relative text-center p-6">
              <h2 className="text-lg font-serif font-semibold mt-2">AKAD NIKAH</h2>
              <p className="text-gray-600 mt-2 font-serif font-medium">
                Senin, 03 Mei 2025
              </p>
              <p className="text-gray-600">07.00 WIB - Selesai</p>
              {/* Lokasi Map */}
              <div className="mt-4 w-full">
                <iframe
                  className="w-full h-40 rounded-lg shadow-md"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.671825365702!2d110.37881347413379!3d-7.821435277047214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57910b3c5d75%3A0xdeb4377e2d70c6d5!2sGrand%20Ballroom%20Hotel%20Santika!5e0!3m2!1sen!2sid!4v1618911111812!5m2!1sen!2sid"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            <div className="w-full max-w-md bg-white rounded-b-full shadow-lg relative text-center px-6 pb-20 mt-8">
              <h2 className="text-lg font-serif font-semibold mt-2">RESEPSI NIKAH</h2>
              <p className="text-gray-600 mt-2 font-serif font-medium">
                Selasa, 03 Mei 2025
              </p>
              <p className="text-gray-600">07.00 WIB - Selesai</p>
              {/* Lokasi Map */}
              <div className="mt-4 w-full">
                <iframe
                  className="w-full h-40 rounded-lg shadow-md"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.671825365702!2d110.37881347413379!3d-7.821435277047214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57910b3c5d75%3A0xdeb4377e2d70c6d5!2sGrand%20Ballroom%20Hotel%20Santika!5e0!3m2!1sen!2sid!4v1618911111812!5m2!1sen!2sid"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* RSVP Form */}
          <div className="mb-12">
            <h3 className="text-xl font-serif font-bold mb-4">Konfirmasi Kehadiran</h3>
            <form className="bg-gray-100 p-6 rounded-lg shadow-md">
              <input
                type="text"
                placeholder="Nama Anda"
                className="w-full p-2 mb-4 border rounded"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500">
                Kirim
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
