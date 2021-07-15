import React from 'react';
import PlayNowButton from '../PlayNowButton';
import styles from './index.module.css';

const HeroSection: React.FC = () => {
  return (
    <section className={`${styles.section} w-screen relative`}>
      <div className="pt-16 h-full container mx-auto flex flex-col justify-between items-center z-50">
        <h3 className="text-center text-4xl text-white py-10">
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
