import { useRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { supabase } from "./client";
import "./app.css";

const images = [
  "/1.jpeg",
  "/2.jpeg",
  "/3.jpeg",
  "/4.jpeg",
  "/5.jpeg",
  "/6.jpeg",
];

const bgfull = "/Pict1.jpg";

export default function App() {
  const inviteSectionRef = useRef(null);
  const eventDate = new Date("2025-05-03T09:00:00").getTime();
  const [bgImage, setBgImage] = useState(images[0]);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({
    name: "",
    address: "",
    presence: false,
    time: new Date().toISOString(),
  });
  const { name, address, presence, time } = post;
  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    const { data, error } = await supabase.from("message").select("*");

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data);
      console.log("Fetched data:", data);
    }
  }
  async function createPost() {
    const { data, error } = await supabase.from("message").insert([
      {
        name,
        address,
        presence: presence === "true" || presence === true,
        time: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Error inserting post:", error);
    } else {
      console.log("Inserted data:", data);
      setPost({
        name: "",
        address: "",
        presence: false,
        time: new Date().toISOString(),
      });
      fetchPosts();
    }
  }

  const attending = posts.filter((post) => post.presence === true).length;
  const notAttending = posts.filter((post) => post.presence === false).length;

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
      style={{ backgroundImage: `url(${bgfull})` }}
    >
      <div
        className="relative flex-grow max-w-xl mx-auto border-l border-r border-white"
        style={{ backgroundImage: `url(${bgfull})` }}
      >
        {/* Konten */}
        <div className="relative flex-grow">
          {/* Bagian Landing */}
          <div
            className="bg-cover bg-center h-screen flex flex-col items-center justify-center text-center p-8 w-full"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <h2 className="text-sm text-gray-500 mb-2">THE WEDDING OF</h2>
            <h1 className="text-5xl font-serif font-bold mb-4">
              NOFRIDHO & NADYA
            </h1>
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
                <h2 className="text-lg font-serif font-semibold mt-2">
                  AKAD NIKAH
                </h2>
                <p className="text-gray-600 mt-2 font-serif font-medium">
                  Senin, 03 Mei 2025
                </p>
                <p className="text-gray-600">07.00 WIB - Selesai</p>
                {/* Lokasi Map */}
                <div className="mt-4 w-full flex justify-center">
                  <iframe
                    className="w-60 h-40 rounded-lg shadow-md"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.671825365702!2d110.37881347413379!3d-7.821435277047214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57910b3c5d75%3A0xdeb4377e2d70c6d5!2sGrand%20Ballroom%20Hotel%20Santika!5e0!3m2!1sen!2sid!4v1618911111812!5m2!1sen!2sid"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>

              <div className="w-full max-w-md bg-white rounded-b-full shadow-lg relative text-center px-6 pb-14 mt-8">
                <h2 className="text-lg font-serif font-semibold mt-2">
                  RESEPSI NIKAH
                </h2>
                <p className="text-gray-600 mt-2 font-serif font-medium">
                  Selasa, 03 Mei 2025
                </p>
                <p className="text-gray-600">07.00 WIB - Selesai</p>
                {/* Lokasi Map */}
                <div className="mt-4 w-full flex justify-center">
                  <iframe
                    className="w-60 h-40 rounded-lg shadow-md"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.671825365702!2d110.37881347413379!3d-7.821435277047214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57910b3c5d75%3A0xdeb4377e2d70c6d5!2sGrand%20Ballroom%20Hotel%20Santika!5e0!3m2!1sen!2sid!4v1618911111812!5m2!1sen!2sid"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* RSVP Form */}
            <div className="flex justify-center items-center min-h-screen">
              <div className="p-6 rounded-lg shadow-lg max-w-md w-full text-center border border-gray-300">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                  Wishes
                </h2>
                <p className="text-gray-600">
                  Berikan ucapan harapan dan doa kepada kedua mempelai
                </p>
                <div className="flex justify-center gap-4 my-4">
                  <div className="bg-green-300 px-4 py-2 rounded text-white font-semibold">
                    ✅ {attending} Hadir
                  </div>
                  <div className="bg-red-300 px-4 py-2 rounded text-white font-semibold">
                    ❌ {notAttending} Tidak Hadir
                  </div>
                </div>

                <form className="space-y-3">
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setPost({ ...post, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-white"
                  />
                  <textarea
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) =>
                      setPost({ ...post, address: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md bg-white"
                    rows="3"
                  ></textarea>
                  <select
                    value={presence}
                    onChange={(e) =>
                      setPost({ ...post, presence: e.target.value === "true" })
                    }
                    className="w-full px-3 py-2 border rounded-md bg-white"
                  >
                    <option value="true">Hadir</option>
                    <option value="false">Tidak Hadir</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-yellow-500 py-2 rounded-md font-semibold text-white"
                    onClick={createPost}
                  >
                    Kirim
                  </button>
                </form>
                <div className="mt-6 text-left">
                  <h3 className="font-semibold mb-2 text-gray-700">
                    Komentar:
                  </h3>
                  <div className="max-h-80 overflow-y-auto space-y-2">
                    {posts.map((post) => (
                      <div
                        className="bg-white p-3 rounded-lg shadow border border-gray-300"
                        key={post.id}
                      >
                        <p className="font-semibold text-gray-700">
                          {post.name} {post.presence ? "✅" : "❌"}
                        </p>
                        <p className="text-gray-600">{post.address}</p>
                        <p className="text-gray-500 text-sm">
                          {new Date(post.time).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div>
                    <h1>Supabase Messages</h1>
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setPost({ ...post, name: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setPost({ ...post, address: e.target.value })}
                    />
                    <select
                      value={presence}
                      onChange={(e) =>
                        setPost({ ...post, presence: e.target.value === "true" })
                      }
                    >
                      <option value="true">Present</option>
                      <option value="false">Absent</option>
                    </select>
                    <button onClick={createPost}>Submit</button>
        
                    <h2>Messages</h2>
                    {posts.map((post) => (
                      <div key={post.id}>
                        <p>Name: {post.name}</p>
                        <p>Address: {post.address}</p>
                        <p>Presence: {post.presence ? "Present" : "Absent"}</p>
                        <p>Time: {new Date(post.time).toLocaleString()}</p>
                      </div>
                    ))}
                  </div> */
}
