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
const bgfull2 = "/Pict2.jpg";

export default function App() {
  const [isScrollAllowed, setIsScrollAllowed] = useState(false);
  const inviteSectionRef = useRef(null);
  const eventDate = new Date("2025-05-03T09:00:00").getTime();
  const [bgImage, setBgImage] = useState(images[0]);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({
    name: "",
    address: "",
    presence: false,
    time: new Date().toISOString(),
    quantity: 0,
  });
  const { name, address, presence, time, quantity } = post;
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
  async function createPost(event) {
    event.preventDefault(); // Mencegah perilaku default form

    const { data, error } = await supabase.from("message").insert([
      {
        name,
        address,
        presence: presence === "true" || presence === true,
        time: new Date().toISOString(),
        quantity,
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
        quantity: 0,
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
    if (!isScrollAllowed) {
      // Blokir scroll
      document.body.classList.add("no-scroll");
    } else {
      // Izinkan scroll
      document.body.classList.remove("no-scroll");
    }

    // Bersihkan event listener saat komponen di-unmount
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isScrollAllowed]);

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
    setIsScrollAllowed(true); // Izinkan scroll
    inviteSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current) {
        audioRef.current.muted = false; // Unmute audio
        audioRef.current.play(); // Play audio
        setIsPlaying(true);
        // Hapus event listener setelah interaksi pertama
        document.removeEventListener("click", handleUserInteraction);
        document.removeEventListener("scroll", handleUserInteraction);
      }
    };

    // Tambahkan event listener untuk interaksi pengguna
    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("scroll", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("scroll", handleUserInteraction);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal
  };

  return (
    <div
      className="relative min-h-screen bg-fixed bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        className="absolute inset-0 bg-black opacity-45"
        // aria-hidden="true"
      ></div>
      <div
        className="relative flex-grow max-w-xl mx-auto border-l border-r border-white"
        style={{ backgroundImage: `url(${bgfull})` }}
      >
        <audio ref={audioRef} src="/backsound.mp3" autoPlay loop />
        {/* Music control button */}
        <div
          className="fixed bottom-4 right-4 z-50"
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          <button
            onClick={togglePlayPause}
            className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition relative group"
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            {/* Tooltip */}
            <span className="absolute opacity-0 group-hover:opacity-100 bg-black text-white text-sm px-2 py-1 rounded bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              {isPlaying ? "Pause Music" : "Play Music"}
            </span>
          </button>
        </div>

        {/* Konten */}
        <div className="relative flex-grow">
          {/* Bagian Landing */}
          <div
            className="bg-cover bg-center h-screen flex p-8 w-full relative"
            // style={{ backgroundImage: `url(${bgImage})` }}
          >
            {/* Background Transparan dengan Animasi Fade-In */}
            <div
              className="rounded-3xl bg-white bg-opacity-50 flex flex-col items-center justify-center text-center animate-fade-in"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
            >
              {/* Foto Chibi dengan Animasi Fade-In */}
              <div className="w-80 max-w-md bg-white rounded-t-full shadow-lg relative text-center">
                <img
                  src="/chibi.PNG"
                  alt="Nofridho & Nadya"
                  className="w-full h-full object-cover animate-zoomin-f"
                />
              </div>
              <h2 className="text-sm text-gray-500 m-2">THE WEDDING OF</h2>
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
              <button
                onClick={handleScroll}
                className="bg-white text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 transition"
              >
                Buka Undangan
              </button>
            </div>

            {/* Foto Rumah Gadang dengan Animasi Fade-Out */}
            <img
              src="/rumahgadang.png"
              alt="Nofridho & Nadya"
              className="w-100 h-58 absolute -bottom-18 left-1/2 transform -translate-x-1/2 animate-zoomin-f"
            />
          </div>

          {/* Undangan Section */}
          <div ref={inviteSectionRef} className="mb-12 text-center">
            {/* Bagian Ucapan */}
            <div
              className="h-screen flex flex-col items-center justify-center text-center p-8 relative"
              style={{ backgroundImage: `url(${bgfull2})` }}
            >
              {/* Gambar dengan border lingkaran */}
              <div class="flex flex-col justify-center items-center min-h-screen">
                <div class="bg-white rounded-3xl shadow-lg overflow-hidden max-w-lg w-full">
                  <img
                    src="/1.jpeg"
                    alt="Mountain"
                    class="w-full h-144 object-cover"
                  />
                  <div class="p-6">
                    <p class="text-gray-700 leading-tight mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam eu sapien porttitor, blandit velit ac, vehicula
                      elit. Nunc et ex at turpis rutrum viverra.
                    </p>
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">
                      Lorem, ipsum.
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Bagian Ucapan */}
            <div
              className="flex flex-col items-center justify-center text-center p-8 relative"
              style={{ backgroundImage: `url(${bgfull})` }}
            >
              {/* Gambar dengan border lingkaran */}
              <h3 className="text-xl font-serif font-bold mb-4">Salam</h3>
              <div className="mb-12">
                <div className="flex justify-center items-center">
                  <div className="w-40 h-60 border border-white rounded-full overflow-hidden relative">
                    <img
                      src="/1.jpeg"
                      alt="Nofridho & Nadya"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 leading-tight mb-4">
                    Lorem ipsum dolor, sit amet consectetur adipisicing.
                  </p>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Lorem, ipsum.
                  </h2>
                  <section className="flex justify-center items-center">
                    <button
                      href="/"
                      className="group flex justify-center p-2 rounded-md drop-shadow-xl from-gray-800 bg-[#a21caf] text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1.2em"
                        viewBox="0 0 24 24"
                        stroke-width="1"
                        fill="currentColor"
                        stroke="currentColor"
                        className="w-5"
                      >
                        <path d="M12.001 9C10.3436 9 9.00098 10.3431 9.00098 12C9.00098 13.6573 10.3441 15 12.001 15C13.6583 15 15.001 13.6569 15.001 12C15.001 10.3427 13.6579 9 12.001 9ZM12.001 7C14.7614 7 17.001 9.2371 17.001 12C17.001 14.7605 14.7639 17 12.001 17C9.24051 17 7.00098 14.7629 7.00098 12C7.00098 9.23953 9.23808 7 12.001 7ZM18.501 6.74915C18.501 7.43926 17.9402 7.99917 17.251 7.99917C16.5609 7.99917 16.001 7.4384 16.001 6.74915C16.001 6.0599 16.5617 5.5 17.251 5.5C17.9393 5.49913 18.501 6.0599 18.501 6.74915ZM12.001 4C9.5265 4 9.12318 4.00655 7.97227 4.0578C7.18815 4.09461 6.66253 4.20007 6.17416 4.38967C5.74016 4.55799 5.42709 4.75898 5.09352 5.09255C4.75867 5.4274 4.55804 5.73963 4.3904 6.17383C4.20036 6.66332 4.09493 7.18811 4.05878 7.97115C4.00703 9.0752 4.00098 9.46105 4.00098 12C4.00098 14.4745 4.00753 14.8778 4.05877 16.0286C4.0956 16.8124 4.2012 17.3388 4.39034 17.826C4.5591 18.2606 4.7605 18.5744 5.09246 18.9064C5.42863 19.2421 5.74179 19.4434 6.17187 19.6094C6.66619 19.8005 7.19148 19.9061 7.97212 19.9422C9.07618 19.9939 9.46203 20 12.001 20C14.4755 20 14.8788 19.9934 16.0296 19.9422C16.8117 19.9055 17.3385 19.7996 17.827 19.6106C18.2604 19.4423 18.5752 19.2402 18.9074 18.9085C19.2436 18.5718 19.4445 18.2594 19.6107 17.8283C19.8013 17.3358 19.9071 16.8098 19.9432 16.0289C19.9949 14.9248 20.001 14.5389 20.001 12C20.001 9.52552 19.9944 9.12221 19.9432 7.97137C19.9064 7.18906 19.8005 6.66149 19.6113 6.17318C19.4434 5.74038 19.2417 5.42635 18.9084 5.09255C18.573 4.75715 18.2616 4.55693 17.8271 4.38942C17.338 4.19954 16.8124 4.09396 16.0298 4.05781C14.9258 4.00605 14.5399 4 12.001 4ZM12.001 2C14.7176 2 15.0568 2.01 16.1235 2.06C17.1876 2.10917 17.9135 2.2775 18.551 2.525C19.2101 2.77917 19.7668 3.1225 20.3226 3.67833C20.8776 4.23417 21.221 4.7925 21.476 5.45C21.7226 6.08667 21.891 6.81333 21.941 7.8775C21.9885 8.94417 22.001 9.28333 22.001 12C22.001 14.7167 21.991 15.0558 21.941 16.1225C21.8918 17.1867 21.7226 17.9125 21.476 18.55C21.2218 19.2092 20.8776 19.7658 20.3226 20.3217C19.7668 20.8767 19.2076 21.22 18.551 21.475C17.9135 21.7217 17.1876 21.89 16.1235 21.94C15.0568 21.9875 14.7176 22 12.001 22C9.28431 22 8.94514 21.99 7.87848 21.94C6.81431 21.8908 6.08931 21.7217 5.45098 21.475C4.79264 21.2208 4.23514 20.8767 3.67931 20.3217C3.12348 19.7658 2.78098 19.2067 2.52598 18.55C2.27848 17.9125 2.11098 17.1867 2.06098 16.1225C2.01348 15.0558 2.00098 14.7167 2.00098 12C2.00098 9.28333 2.01098 8.94417 2.06098 7.8775C2.11014 6.8125 2.27848 6.0875 2.52598 5.45C2.78014 4.79167 3.12348 4.23417 3.67931 3.67833C4.23514 3.1225 4.79348 2.78 5.45098 2.525C6.08848 2.2775 6.81348 2.11 7.87848 2.06C8.94514 2.0125 9.28431 2 12.001 2Z"></path>
                      </svg>
                      <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-7 duration-700">
                        Instagram
                      </span>
                    </button>
                  </section>
                </div>
              </div>
              <div className="mb-12">
                <div className="flex justify-center items-center">
                  <div className="w-40 h-60 border border-white rounded-full overflow-hidden relative">
                    <img
                      src="/1.jpeg"
                      alt="Nofridho & Nadya"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 leading-tight mb-4">
                    Lorem ipsum dolor, sit amet consectetur adipisicing.
                  </p>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Lorem, ipsum.
                  </h2>
                  <section className="flex justify-center items-center">
                    <button
                      href="/"
                      className="group flex justify-center p-2 rounded-md drop-shadow-xl from-gray-800 bg-[#a21caf] text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1.2em"
                        viewBox="0 0 24 24"
                        stroke-width="1"
                        fill="currentColor"
                        stroke="currentColor"
                        className="w-5"
                      >
                        <path d="M12.001 9C10.3436 9 9.00098 10.3431 9.00098 12C9.00098 13.6573 10.3441 15 12.001 15C13.6583 15 15.001 13.6569 15.001 12C15.001 10.3427 13.6579 9 12.001 9ZM12.001 7C14.7614 7 17.001 9.2371 17.001 12C17.001 14.7605 14.7639 17 12.001 17C9.24051 17 7.00098 14.7629 7.00098 12C7.00098 9.23953 9.23808 7 12.001 7ZM18.501 6.74915C18.501 7.43926 17.9402 7.99917 17.251 7.99917C16.5609 7.99917 16.001 7.4384 16.001 6.74915C16.001 6.0599 16.5617 5.5 17.251 5.5C17.9393 5.49913 18.501 6.0599 18.501 6.74915ZM12.001 4C9.5265 4 9.12318 4.00655 7.97227 4.0578C7.18815 4.09461 6.66253 4.20007 6.17416 4.38967C5.74016 4.55799 5.42709 4.75898 5.09352 5.09255C4.75867 5.4274 4.55804 5.73963 4.3904 6.17383C4.20036 6.66332 4.09493 7.18811 4.05878 7.97115C4.00703 9.0752 4.00098 9.46105 4.00098 12C4.00098 14.4745 4.00753 14.8778 4.05877 16.0286C4.0956 16.8124 4.2012 17.3388 4.39034 17.826C4.5591 18.2606 4.7605 18.5744 5.09246 18.9064C5.42863 19.2421 5.74179 19.4434 6.17187 19.6094C6.66619 19.8005 7.19148 19.9061 7.97212 19.9422C9.07618 19.9939 9.46203 20 12.001 20C14.4755 20 14.8788 19.9934 16.0296 19.9422C16.8117 19.9055 17.3385 19.7996 17.827 19.6106C18.2604 19.4423 18.5752 19.2402 18.9074 18.9085C19.2436 18.5718 19.4445 18.2594 19.6107 17.8283C19.8013 17.3358 19.9071 16.8098 19.9432 16.0289C19.9949 14.9248 20.001 14.5389 20.001 12C20.001 9.52552 19.9944 9.12221 19.9432 7.97137C19.9064 7.18906 19.8005 6.66149 19.6113 6.17318C19.4434 5.74038 19.2417 5.42635 18.9084 5.09255C18.573 4.75715 18.2616 4.55693 17.8271 4.38942C17.338 4.19954 16.8124 4.09396 16.0298 4.05781C14.9258 4.00605 14.5399 4 12.001 4ZM12.001 2C14.7176 2 15.0568 2.01 16.1235 2.06C17.1876 2.10917 17.9135 2.2775 18.551 2.525C19.2101 2.77917 19.7668 3.1225 20.3226 3.67833C20.8776 4.23417 21.221 4.7925 21.476 5.45C21.7226 6.08667 21.891 6.81333 21.941 7.8775C21.9885 8.94417 22.001 9.28333 22.001 12C22.001 14.7167 21.991 15.0558 21.941 16.1225C21.8918 17.1867 21.7226 17.9125 21.476 18.55C21.2218 19.2092 20.8776 19.7658 20.3226 20.3217C19.7668 20.8767 19.2076 21.22 18.551 21.475C17.9135 21.7217 17.1876 21.89 16.1235 21.94C15.0568 21.9875 14.7176 22 12.001 22C9.28431 22 8.94514 21.99 7.87848 21.94C6.81431 21.8908 6.08931 21.7217 5.45098 21.475C4.79264 21.2208 4.23514 20.8767 3.67931 20.3217C3.12348 19.7658 2.78098 19.2067 2.52598 18.55C2.27848 17.9125 2.11098 17.1867 2.06098 16.1225C2.01348 15.0558 2.00098 14.7167 2.00098 12C2.00098 9.28333 2.01098 8.94417 2.06098 7.8775C2.11014 6.8125 2.27848 6.0875 2.52598 5.45C2.78014 4.79167 3.12348 4.23417 3.67931 3.67833C4.23514 3.1225 4.79348 2.78 5.45098 2.525C6.08848 2.2775 6.81348 2.11 7.87848 2.06C8.94514 2.0125 9.28431 2 12.001 2Z"></path>
                      </svg>
                      <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-7 duration-700">
                        Instagram
                      </span>
                    </button>
                  </section>
                </div>
              </div>
            </div>

            {/* Countdown */}
            <div
              className="pb-12 text-center"
              style={{ backgroundImage: `url(${bgfull2})` }}
            >
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
            <div
              className="flex flex-col items-center p-12"
              style={{ backgroundImage: `url(${bgfull})` }}
            >
              <div className="w-full max-w-md bg-white rounded-t-full shadow-lg relative text-center p-28">
                <h2 className="text-lg font-serif font-semibold mt-2">
                  AKAD NIKAH
                </h2>
                <p className="text-gray-600 mt-2 font-serif font-medium">
                  Senin, 03 Mei 2025
                </p>
                <p className="text-gray-600">07.00 WIB - Selesai</p>
                {/* Lokasi Map */}
                <div className="mt-4 w-full flex justify-center">
                  {/* <iframe
                    className="w-60 h-40 rounded-lg shadow-md"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.671825365702!2d110.37881347413379!3d-7.821435277047214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57910b3c5d75%3A0xdeb4377e2d70c6d5!2sGrand%20Ballroom%20Hotel%20Santika!5e0!3m2!1sen!2sid!4v1618911111812!5m2!1sen!2sid"
                    allowFullScreen
                    loading="lazy"
                  ></iframe> */}
                  <button className="bg-white text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 transition">
                    Lokasi
                  </button>
                </div>
              </div>

              <div className="w-full max-w-md bg-white rounded-b-full shadow-lg relative text-center px-6 p-28">
                <h2 className="text-lg font-serif font-semibold mt-2">
                  RESEPSI NIKAH
                </h2>
                <p className="text-gray-600 mt-2 font-serif font-medium">
                  Selasa, 03 Mei 2025
                </p>
                <p className="text-gray-600">07.00 WIB - Selesai</p>
                {/* Lokasi Map */}
                <div className="mt-4 w-full flex justify-center">
                  {/* <iframe
                    className="w-60 h-40 rounded-lg shadow-md"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.671825365702!2d110.37881347413379!3d-7.821435277047214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57910b3c5d75%3A0xdeb4377e2d70c6d5!2sGrand%20Ballroom%20Hotel%20Santika!5e0!3m2!1sen!2sid!4v1618911111812!5m2!1sen!2sid"
                    allowFullScreen
                    loading="lazy"
                  ></iframe> */}
                  <button
                    // onClick={handleScroll}
                    className="bg-white text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 transition"
                  >
                    Lokasi
                  </button>
                </div>
              </div>
            </div>

            {/* RSVP Form */}
            <div
              className="flex justify-center items-center min-h-screen"
              style={{ backgroundImage: `url(${bgfull2})` }}
            >
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
                    placeholder="Nama"
                    value={name}
                    onChange={(e) => setPost({ ...post, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-white"
                  />
                  <input
                    type="number"
                    placeholder="Jumlah Tamu"
                    value={quantity}
                    onChange={(e) =>
                      setPost({ ...post, quantity: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md bg-white"
                  />
                  <textarea
                    type="text"
                    placeholder="Pesan"
                    value={address}
                    onChange={(e) =>
                      setPost({ ...post, address: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md bg-white"
                    rows="3"
                  ></textarea>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPost({ ...post, presence: true })}
                      className={`flex-1 py-2 rounded-md font-semibold ${
                        presence === true
                          ? "bg-green-500 text-white"
                          : "bg-green-200 text-green-700"
                      }`}
                    >
                      Hadir
                    </button>
                    <button
                      type="button"
                      onClick={() => setPost({ ...post, presence: false })}
                      className={`flex-1 py-2 rounded-md font-semibold ${
                        presence === false
                          ? "bg-red-500 text-white"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      Tidak Hadir
                    </button>
                  </div>

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

            {/* Gift Section */}
            <div
              className="flex flex-col items-center p-12"
              style={{ backgroundImage: `url(${bgfull})` }}
            >
              <h2 className="text-2xl md:text-4xl font-serif font-bold drop-shadow-lg mb-20">
                Wedding Day
              </h2>
              <div className="card">
                <div
                  className={`relative bg-black w-[300px] sm:w-[350px] transition-all duration-700 aspect-video flex items-center justify-center ${
                    isOpen ? "group" : ""
                  }`}
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
                  <button
                    onClick={handleToggle}
                    className={`seal bg-rose-300 text-rose-500 w-10 aspect-square rounded-full z-40 text-[10px] flex items-center justify-center font-semibold [clip-path:polygon(50%_0%,_80%_10%,_100%_35%,_100%_70%,_80%_90%,_50%_100%,_20%_90%,_0%_70%,_0%_35%,_20%_10%)] border-4 border-rose-400 transition-all duration-1000 ${
                      isOpen ? "translate-y-3" : ""
                    }`}
                  >
                    Gift
                  </button>

                  {/* Top Triangle */}
                  <div
                    className={`tp transition-all duration-300 ${
                      isOpen ? "duration-100" : ""
                    } bg-orange-300 absolute w-full h-full ${
                      isOpen
                        ? "[clip-path:polygon(50%_0%,_100%_0,_0_0)]"
                        : "[clip-path:polygon(50%_50%,_100%_0,_0_0)]"
                    }`}
                  ></div>

                  {/* Left Triangle */}
                  <div
                    className={`lft transition-all duration-700 absolute w-full h-full bg-orange-400 [clip-path:polygon(50%_50%,_0_0,_0_100%)] ${
                      isOpen ? "[clip-path:polygon(50%_0%,_0_0,_0_100%)]" : ""
                    }`}
                  ></div>

                  {/* Right Triangle */}
                  <div
                    className={`rgt transition-all duration-700 absolute w-full h-full bg-orange-400 [clip-path:polygon(50%_50%,_100%_0,_100%_100%)] ${
                      isOpen
                        ? "[clip-path:polygon(50%_0%,_100%_0,_100%_100%)]"
                        : ""
                    }`}
                  ></div>

                  {/* Bottom Triangle */}
                  <div
                    className={`btm transition-all duration-700 absolute w-full h-full bg-orange-300 [clip-path:polygon(50%_50%,_100%_100%,_0_100%)] ${
                      isOpen
                        ? "[clip-path:polygon(50%_0%,_100%_100%,_0_100%)]"
                        : ""
                    }`}
                  ></div>
                </div>
              </div>
            </div>
            {/* Galeri Foto */}
            <div
              className="p-10"
              style={{ backgroundImage: `url(${bgfull2})` }}
            >
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
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /* <button
  onClick={handleModalToggle} // Tampilkan modal saat diklik
  className="font-sans text-[10px] text-gray-700 pt-5 underline hover:text-rose-500 transition-colors"
>
  Scan QR Code
</button> */
}
{
  /* Modal untuk QR Code */
}
{
  /* {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h3 className="text-xl font-semibold mb-4">Scan QR Code</h3>
      <img
        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com" // Ganti dengan URL QR code Anda
        alt="QR Code"
        className="mx-auto"
      />
      <button
        onClick={handleModalToggle} // Tutup modal saat diklik
        className="mt-4 bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition-colors"
      >
        Tutup
      </button>
    </div>
  </div>
)} */
}

{
  /* <div
  className="flex justify-center items-center min-h-screen"
  // style={{ backgroundImage: `url(${bgfull2})` }}
>
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
        placeholder="Nama"
        value={name}
        onChange={(e) => setPost({ ...post, name: e.target.value })}
        className="w-full px-3 py-2 border rounded-md bg-white"
      />
      <input
        type="number"
        placeholder="Jumlah Tamu"
        value={name}
        onChange={(e) =>
          setPost({ ...post, quantity: e.target.value })
        }
        className="w-full px-3 py-2 border rounded-md bg-white"
      />
      <textarea
        type="text"
        placeholder="Pesan"
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
</div> */
}
{
  /* <div class="card">
  <div class="relative bg-black w-[300px] sm:w-[350px] group transition-all duration-700 aspect-video flex items-center justify-center">
    <div class="transition-all flex flex-col items-center py-5 justify-start duration-300 group-hover:duration-1000 bg-white w-full h-full absolute group-hover:-translate-y-16">
      <p class="text-xl sm:text-2xl font-semibold text-gray-500 font-serif">
      Thank You
      </p>
      <p class="px-10 text-[10px] sm:text-[12px] text-gray-700">
        It’s so nice that you had the time to view this idea
      </p>
      <p class="font-serif text-[10px] sm:text-[12px text-gray-700">
      Wishing you a fantastic day ahead!
      </p>
      <p class="font-sans text-[10px] text-gray-700 pt-5">
      SMOOKYDEV
      </p>
    </div>
    <button class="seal bg-rose-500 text-red-800 w-10 aspect-square rounded-full z-40 text-[10px] flex items-center justify-center font-semibold [clip-path:polygon(50%_0%,_80%_10%,_100%_35%,_100%_70%,_80%_90%,_50%_100%,_20%_90%,_0%_70%,_0%_35%,_20%_10%)] group-hover:opacity-0 transition-all duration-1000 group-hover:scale-0 group-hover:rotate-180 border-4 border-rose-900">
      SMKY
    </button>
    <div class="tp transition-all duration-1000 group-hover:duration-100 bg-neutral-800 absolute group-hover:[clip-path:polygon(50%_0%,_100%_0,_0_0)] w-full h-full [clip-path:polygon(50%_50%,_100%_0,_0_0)]"></div>
    <div class="lft transition-all duration-700 absolute w-full h-full bg-neutral-900 [clip-path:polygon(50%_50%,_0_0,_0_100%)]"></div>
    <div class="rgt transition-all duration-700 absolute w-full h-full bg-neutral-800 [clip-path:polygon(50%_50%,_100%_0,_100%_100%)]"></div>
    <div class="btm transition-all duration-700 absolute w-full h-full bg-neutral-900 [clip-path:polygon(50%_50%,_100%_100%,_0_100%)]"></div>
  </div> 
</div>*/
}

{
  /* <div className="wrapper">
  <button className="button" onClick={handleScroll}>
    <svg className="svgIcon" viewBox="0 0 384 512">
      <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
    </svg>
  </button>
</div> */
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
