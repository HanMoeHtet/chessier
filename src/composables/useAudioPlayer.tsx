import React, { createContext, useContext, useRef } from 'react';

interface AudioRefs {
  startRef: React.RefObject<HTMLAudioElement>;
  endRef: React.RefObject<HTMLAudioElement>;
  captureRef: React.RefObject<HTMLAudioElement>;
  castleRef: React.RefObject<HTMLAudioElement>;
  premoveRef: React.RefObject<HTMLAudioElement>;
  moveSelfRef: React.RefObject<HTMLAudioElement>;
  moveCheckRef: React.RefObject<HTMLAudioElement>;
  moveOppenentRef: React.RefObject<HTMLAudioElement>;
  promoteRef: React.RefObject<HTMLAudioElement>;
  tenSecondsRef: React.RefObject<HTMLAudioElement>;
  illegalRef: React.RefObject<HTMLAudioElement>;
}

const Context = createContext<AudioRefs | null>(null);

export const Provider: React.FC = ({ children }) => {
  const startRef = useRef<HTMLAudioElement>(null);
  const endRef = useRef<HTMLAudioElement>(null);
  const captureRef = useRef<HTMLAudioElement>(null);
  const castleRef = useRef<HTMLAudioElement>(null);
  const premoveRef = useRef<HTMLAudioElement>(null);
  const moveSelfRef = useRef<HTMLAudioElement>(null);
  const moveCheckRef = useRef<HTMLAudioElement>(null);
  const moveOppenentRef = useRef<HTMLAudioElement>(null);
  const promoteRef = useRef<HTMLAudioElement>(null);
  const tenSecondsRef = useRef<HTMLAudioElement>(null);
  const illegalRef = useRef<HTMLAudioElement>(null);

  return (
    <>
      <Context.Provider
        value={{
          startRef,
          endRef,
          captureRef,
          castleRef,
          premoveRef,
          moveSelfRef,
          moveCheckRef,
          moveOppenentRef,
          promoteRef,
          tenSecondsRef,
          illegalRef,
        }}
      >
        {children}
      </Context.Provider>
      <>
        <audio preload="auto" ref={startRef}>
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_WEBM_/default/game-start.webm"
            type="audio/webm"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_OGG_/default/game-start.ogg"
            type="audio/ogg"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/game-start.mp3"
            type="audio/mpeg"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_WAV_/default/game-start.wav"
            type="audio/wav"
          />
        </audio>
        <audio preload="auto" ref={endRef}>
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_WEBM_/default/game-end.webm"
            type="audio/webm"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_OGG_/default/game-end.ogg"
            type="audio/ogg"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/game-end.mp3"
            type="audio/mpeg"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_WAV_/default/game-end.wav"
            type="audio/wav"
          />
        </audio>
        <audio preload="auto" ref={captureRef}>
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_WEBM_/default/capture.webm"
            type="audio/webm"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_OGG_/default/capture.ogg"
            type="audio/ogg"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/capture.mp3"
            type="audio/mpeg"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_WAV_/default/capture.wav"
            type="audio/wav"
          />
        </audio>
        <audio preload="auto" ref={castleRef}>
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_WEBM_/default/castle.webm"
            type="audio/webm"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_OGG_/default/castle.ogg"
            type="audio/ogg"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/castle.mp3"
            type="audio/mpeg"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_WAV_/default/castle.wav"
            type="audio/wav"
          />
        </audio>
        <audio preload="auto" ref={premoveRef}>
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_WEBM_/default/premove.webm"
            type="audio/webm"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_OGG_/default/premove.ogg"
            type="audio/ogg"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/premove.mp3"
            type="audio/mpeg"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_WAV_/default/premove.wav"
            type="audio/wav"
          />
        </audio>
        <audio preload="auto" ref={moveSelfRef}>
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_WEBM_/default/move-self.webm"
            type="audio/webm"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_OGG_/default/move-self.ogg"
            type="audio/ogg"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-self.mp3"
            type="audio/mpeg"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_WAV_/default/move-self.wav"
            type="audio/wav"
          />
        </audio>
        <audio preload="auto" ref={moveCheckRef}>
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_WEBM_/default/move-check.webm"
            type="audio/webm"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_OGG_/default/move-check.ogg"
            type="audio/ogg"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-check.mp3"
            type="audio/mpeg"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_WAV_/default/move-check.wav"
            type="audio/wav"
          />
        </audio>
        <audio preload="auto" ref={moveOppenentRef}>
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_WEBM_/default/move-opponent.webm"
            type="audio/webm"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_OGG_/default/move-opponent.ogg"
            type="audio/ogg"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-opponent.mp3"
            type="audio/mpeg"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_WAV_/default/move-opponent.wav"
            type="audio/wav"
          />
        </audio>
        <audio preload="auto" ref={promoteRef}>
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_WEBM_/default/promote.webm"
            type="audio/webm"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_OGG_/default/promote.ogg"
            type="audio/ogg"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/promote.mp3"
            type="audio/mpeg"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_WAV_/default/promote.wav"
            type="audio/wav"
          />
        </audio>
        <audio preload="auto" ref={tenSecondsRef}>
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_WEBM_/default/tenseconds.webm"
            type="audio/webm"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_OGG_/default/tenseconds.ogg"
            type="audio/ogg"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/tenseconds.mp3"
            type="audio/mpeg"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_WAV_/default/tenseconds.wav"
            type="audio/wav"
          />
        </audio>
        <audio preload="auto" ref={illegalRef}>
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_WEBM_/default/illegal.webm"
            type="audio/webm"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_OGG_/default/illegal.ogg"
            type="audio/ogg"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/illegal.mp3"
            type="audio/mpeg"
          />
          <source
            src="https://images.chesscomfiles.com/chess-themes/sounds/_WAV_/default/illegal.wav"
            type="audio/wav"
          />
        </audio>
      </>
    </>
  );
};

export const useAudioPlayer = () => {
  const comsumer = useContext(Context);

  if (!comsumer) {
    throw new Error('Provider not found.');
  }

  const {
    startRef,
    endRef,
    captureRef,
    castleRef,
    illegalRef,
    moveCheckRef,
    moveOppenentRef,
    moveSelfRef,
    premoveRef,
    promoteRef,
    tenSecondsRef,
  } = comsumer;

  const start = () => {
    if (!startRef.current) return;
    startRef.current.play();
  };

  const end = () => {
    if (!endRef.current) return;
    endRef.current.play();
  };

  const capture = () => {
    if (!captureRef.current) return;
    captureRef.current.play();
  };

  const castle = () => {
    if (!castleRef.current) return;
    castleRef.current.play();
  };

  const premove = () => {
    if (!premoveRef.current) return;
    premoveRef.current.play();
  };

  const moveSelf = () => {
    if (!moveSelfRef.current) return;
    moveSelfRef.current.play();
  };

  const moveCheck = () => {
    if (!moveCheckRef.current) return;
    moveCheckRef.current.play();
  };

  const moveOpponent = () => {
    if (!moveOppenentRef.current) return;
    moveOppenentRef.current.play();
  };

  const promote = () => {
    if (!promoteRef.current) return;
    promoteRef.current.play();
  };

  const tenSeconds = () => {
    if (!tenSecondsRef.current) return;
    tenSecondsRef.current.play();
  };

  const illegal = () => {
    if (!illegalRef.current) return;
    illegalRef.current.play();
  };

  return {
    start,
    end,
    capture,
    castle,
    premove,
    moveSelf,
    moveCheck,
    moveOpponent,
    promote,
    tenSeconds,
    illegal,
  };
};
