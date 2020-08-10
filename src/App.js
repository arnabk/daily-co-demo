import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DailyIframe from "@daily-co/daily-js";

const MainContainer = styled.div`
  height: 100vh;
  width: 100%;
  margin: auto;
  text-align: center;
`;

const Button = styled.button`
  position: relative;
  top: 45%;
  width: 200px;
  height: 50px;
  border: none;
  background-color: aquamarine;
  border-radius: 10px;
  font-size: x-large;
  outline: none;
  cursor: pointer;
  &:hover,
  &:active {
    border: 1px dashed black;
  }
`;

const VideoFrame = styled.iframe`
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 400px;
  height: 500px;
  display: ${props => props.joined ? '' : 'none'};
`;

function App() {
  const [videoFrame, setVideoFrame] = useState();
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    setVideoFrame(DailyIframe.wrap(document.querySelector("iframe")));
  }, []);

  const toggleJoinClass = () => {
    if (videoFrame) {
      if (joined) {
        videoFrame.leave();
        setJoined(false);
      } else {
        videoFrame.join({ url: "https://arnabkarmakar.daily.co/test-room",
      showLeaveButton: false, showFullscreenButton: false, });
        setJoined(true);
      }
    }
  };
  return (
    <MainContainer>
      <Button onClick={toggleJoinClass}>{joined ? "End" : "Join"} Class</Button>
      <VideoFrame allow="microphone; camera; autoplay" joined={joined} />
    </MainContainer>
  );
}

export default App;
