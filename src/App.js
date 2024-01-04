import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { CalendarMonth } from "@mui/icons-material";
import ControlledCarousel from "./components/pics";
import Fab from "@mui/material/Fab";
//import AddIcon from "@mui/icons-material/Add";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";

const App = () => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    const audio = document.getElementById("audio");
    if (isPlaying) {
      setIsPlaying(false);
      audio.pause();
    } else {
      setIsPlaying(true);

      audio.play();
    }
  };

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date("January 19, 2024 00:00:00").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        // stop timer
        clearInterval(interval.current);
      } else {
        // update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };
  // componentDidMount
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });
  return (
    <section className="timer-container">
      <section className="timer">
        {/* <audio id="audio" loop autoPlay>
          <source
            src={process.env.PUBLIC_URL + "/music/maher.mp3"}
            type="audio/mpeg"
          />
        </audio> */}

        <div className="calendar-container">
          <CalendarMonth sx={{ fontSize: 50 }} />
          <h2>العد التنازلي لليوم الموعود</h2>
          <p>
            <FavoriteIcon /> إهداء إلى العريس: محمد علي
          </p>
          <p>
            <FavoriteIcon /> والعروس: الشيماء عبد الوهاب
          </p>
          <p>
            <FavoriteIcon /> بارك الله لهما وبارك عليهما وجمع بينهما في خير
          </p>
        </div>
        <div>
          <section>
            <p>{timerDays}</p>
            <p>
              <small>Days</small>
            </p>
          </section>
          <span>:</span>
          <section>
            <p>{timerHours}</p>
            <p>
              <small>Hours</small>
            </p>
          </section>
          <span>:</span>
          <section>
            <p>{timerMinutes}</p>
            <p>
              <small>Minutes</small>
            </p>
          </section>
          <span>:</span>
          <section>
            <p>{timerSeconds}</p>
            <p>
              <small>Seconds</small>
            </p>
          </section>
        </div>
      </section>
      {/* <div className="carousel-container">
        <ControlledCarousel />
        <Fab size="small" color="primary" aria-label="add" onClick={playAudio}>
          {isPlaying ? <PauseCircleFilledIcon /> : <PlayCircleIcon />}
        </Fab>
      </div> */}
    </section>
  );
};

export default App;
