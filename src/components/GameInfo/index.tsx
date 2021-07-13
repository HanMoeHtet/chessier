import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  resign as resignGame,
  offerDraw as offerDrawGame,
  acceptDraw,
  declineDraw,
} from 'src/store/gameStore/gameSlice';
import PlayersInfo from '../PlayersInfo';
import RatingSystem from '../RatingSystem';
import {
  showDrawOfferReceivedMessage,
  showDrawOfferDeclinedMessage,
} from 'src/services/sweet-alert-2.service';
import GameActions from 'src/components/GameActions';

const GameInfo: React.FC = () => {
  const { isDrawBeingOffered, opponent, wasDrawDeclined } = useAppSelector(
    (state) => state.gameStore
  );

  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (isDrawBeingOffered) {
        const isConfirmed = await showDrawOfferReceivedMessage({
          player: opponent?.displayName!,
        });
        if (isConfirmed) dispatch(acceptDraw());
        else dispatch(declineDraw());
      }
    })();
  }, [isDrawBeingOffered, dispatch, opponent]);

  useEffect(() => {
    if (wasDrawDeclined) {
      showDrawOfferDeclinedMessage({ player: opponent?.displayName! });
    }
  }, [wasDrawDeclined, opponent]);

  return (
    <div className="flex flex-col justify-evenly h-full">
      <PlayersInfo />
      <RatingSystem />
      <GameActions />
    </div>
  );
};

export default GameInfo;
