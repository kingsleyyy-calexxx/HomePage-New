import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import bg from "../assets/bg.mp4";
import flip from "../assets/flip.png";
import jumble from "../assets/jumble.png";
import add from "../assets/add.svg";
import xo from "../assets/xo.png";
import profile from "../assets/profile.png";
import { motion } from "framer-motion";
import "../Styles/Main.css";
import TileGrid from "./TileGrid";
import FlipCard from "./FlipCard";

function Main() {
  const navigate = useNavigate();
  const images = [flip, jumble, add, xo];
  const renderFlip = () => {
    // e.preventDefault;
    navigate("/flipcard");
  };
  const renderWord = () => {
    navigate("/shuffle");
  };
  const textVariants = {
    initial: {
      scale: 0.8,
      color: "#ffffff",
    },
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const letterVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleVideoEnded = () => {
      video.pause();
    };

    video.addEventListener("ended", handleVideoEnded);

    return () => {
      video.removeEventListener("ended", handleVideoEnded);
    };
  }, []);

  return (
    <div className="background-video">
      <video ref={videoRef} autoPlay muted>
        <source src={bg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <img src={profile} alt="Profile-pic" className="profile-pic" />
      <motion.div
        className="centered-text"
        initial="initial"
        animate="animate"
        variants={textVariants}
      >
        <div className="left-content">
          {"Cognitive Training".split("").map((char, index) => (
            <motion.span
              key={index}
              variants={char === " " ? {} : letterVariants}
            >
              {char}
            </motion.span>
          ))}
        </div>
        <div className="right-content">
          <div className="tile-grid">
            <div className="tile">
              <Link to="/flipcard">
                <img
                  onClick={renderFlip}
                  src={flip}
                  alt="flip-card"
                  className="tile-image"
                />
              </Link>
            </div>
            <div className="tile">
              <Link to="/randadd">
                <img src={add} alt="add" className="tile-image" />
              </Link>
            </div>
            <div className="tile">
              <img src={xo} alt="xo" className="tile-image" />
            </div>
            <div className="tile">
              <Link to="/shuffle">
                <img
                  onClick={renderWord}
                  src={jumble}
                  alt="jumble"
                  className="tile-image"
                />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Main;
