import React, { useEffect, useRef } from 'react';
import { setPlayingAudios } from 'src/store/gameStore/gameSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { AudioType } from 'src/types';

const AudioPlayer: React.FC = () => {
  const playingAudios = useAppSelector(
    (state) => state.gameStore.playingAudios
  );
  const audioRefs = useRef<Map<AudioType, HTMLAudioElement | null>>(new Map());

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const audio1 =
        playingAudios[0] && audioRefs.current.get(playingAudios[0]);
      const audio2 =
        playingAudios[1] && audioRefs.current.get(playingAudios[1]);
      if (audio1) {
        try {
          await audio1.play();
          audio1.addEventListener(
            'ended',
            async () => {
              if (audio2) {
                try {
                  await audio2.play();
                  audio2.addEventListener(
                    'ended',
                    function () {
                      dispatch(setPlayingAudios([]));
                    },
                    { once: true }
                  );
                } catch (err) {
                  if (err.name === 'NotAllowedError') {
                    console.log(
                      "Opps audio can't be played right after page loads."
                    );
                  }
                }
              } else {
                dispatch(setPlayingAudios([]));
              }
            },
            { once: true }
          );
        } catch (err) {
          if (err.name === 'NotAllowedError') {
            console.log("Opps audio can't be played right after page loads.");
          }
        }
      }
    })();
  }, [playingAudios, dispatch]);

  return (
    <>
      <audio preload="auto" ref={(el) => audioRefs.current.set('start', el)}>
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
      <audio preload="auto" ref={(el) => audioRefs.current.set('end', el)}>
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
      <audio preload="auto" ref={(el) => audioRefs.current.set('capture', el)}>
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
      <audio preload="auto" ref={(el) => audioRefs.current.set('castle', el)}>
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
      <audio preload="auto" ref={(el) => audioRefs.current.set('premove', el)}>
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
      <audio preload="auto" ref={(el) => audioRefs.current.set('moveSelf', el)}>
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
      <audio
        preload="auto"
        ref={(el) => audioRefs.current.set('moveCheck', el)}
      >
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
      <audio
        preload="auto"
        ref={(el) => audioRefs.current.set('moveOpponent', el)}
      >
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
      <audio preload="auto" ref={(el) => audioRefs.current.set('promote', el)}>
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
      <audio
        preload="auto"
        ref={(el) => audioRefs.current.set('tenSeconds', el)}
      >
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
      <audio preload="auto" ref={(el) => audioRefs.current.set('illegal', el)}>
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
  );
};

export default AudioPlayer;
