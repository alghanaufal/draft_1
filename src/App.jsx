import React, { useRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { supabase } from "./client";
import {
  LandingSection,
  InvitationSection,
  CoupleSection,
  CountdownSection,
  EventSection,
  RSVPSection,
  GiftSection,
  GallerySection,
  MusicControl,
} from "./components";
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

  const { quantity, name, presence, address } = post;

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
    event.preventDefault();
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

  // Intersection Observer untuk animasi
  const { ref: ref1, inView: inView1 } = useInView({ threshold: 0.1 });
  const { ref: ref2, inView: inView2 } = useInView({ threshold: 0.1 });
  const { ref: ref3, inView: inView3 } = useInView({ threshold: 0.1 });
  const { ref: ref4, inView: inView4 } = useInView({ threshold: 0.1 });
  const { ref: ref5, inView: inView5 } = useInView({ threshold: 0.1 });
  const { ref: ref6, inView: inView6 } = useInView({ threshold: 0.1 });
  const { ref: ref7, inView: inView7 } = useInView({ threshold: 0.1 });
  const { ref: ref8, inView: inView8 } = useInView({ threshold: 0.1 });
  const { ref: ref9, inView: inView9 } = useInView({ threshold: 0.1 });

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

  // useEffect(() => {
  //   if (!isScrollAllowed) {
  //     document.body.classList.add("no-scroll");
  //   } else {
  //     document.body.classList.remove("no-scroll");
  //   }
  //   return () => {
  //     document.body.classList.remove("no-scroll");
  //   };
  // }, [isScrollAllowed]);

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
    setIsScrollAllowed(true);
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
        audioRef.current.muted = false;
        audioRef.current.play();
        setIsPlaying(true);
        document.removeEventListener("click", handleUserInteraction);
        document.removeEventListener("scroll", handleUserInteraction);
      }
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("scroll", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("scroll", handleUserInteraction);
    };
  }, []);

  const [guestName, setGuestName] = useState("Tamu Undangan");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const to = urlParams.get("to");
    if (to) {
      setGuestName(to);
    }
  }, []);

  return (
    <div
      className="relative min-h-screen bg-fixed bg-cover bg-center flex flex-col overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        className="absolute inset-0 bg-black opacity-45"
        aria-hidden="true"
      ></div>
      <div
        className="relative flex-grow max-w-xl mx-auto w-full border-l border-r border-white overflow-hidden"
        style={{ backgroundImage: `url(${bgfull})` }}
      >
        <MusicControl
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
          audioRef={audioRef} // Teruskan audioRef ke MusicControl
        />
        <LandingSection guestName={guestName} handleScroll={handleScroll} />
        <div ref={inviteSectionRef} className="mb-12 text-center">
          <InvitationSection ref1={ref1} inView1={inView1} bgImage={bgfull2} />
          <CoupleSection
            ref2={ref2}
            inView2={inView2}
            ref3={ref3}
            inView3={inView3}
            ref4={ref4}
            inView4={inView4}
            bgImage={bgfull2}
          />
          <CountdownSection
            ref5={ref5}
            inView5={inView5}
            timeLeft={timeLeft}
            bgImage={bgfull2}
          />
          <EventSection ref6={ref6} inView6={inView6} bgImage={bgfull} />
          <RSVPSection
            ref7={ref7}
            inView7={inView7}
            posts={posts}
            post={post}
            setPost={setPost}
            createPost={createPost}
            attending={attending}
            notAttending={notAttending}
            bgImage={bgfull2}
          />
          <GiftSection ref8={ref8} inView8={inView8} bgImage={bgfull2} />
          <GallerySection
            ref9={ref9}
            inView9={inView9}
            images={images}
            bgImage={bgfull2}
          />
        </div>
      </div>
    </div>
  );
}
