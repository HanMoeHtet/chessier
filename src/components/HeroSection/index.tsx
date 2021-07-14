import React from 'react';
import PlayButton from '../PlayButton';
import PlayNowButton from '../PlayNowButton';
import styles from './index.module.css';

const HeroSection: React.FC = () => {
  return (
    <section className={`${styles.section} w-screen h-screen`}>
      <div className="pt-16 h-full container mx-auto flex flex-col justify-between items-center">
        <h3 className="text-center text-4xl text-gray-200 py-10">
          Have some fun playing the most watched game on Twitch in 2020
        </h3>
        <div className="mb-24">
          <PlayNowButton />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
