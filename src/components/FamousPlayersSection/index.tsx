import React from 'react';
import data from './data';

const FamousPlayersSection: React.FC = () => {
  return (
    <section className={`w-full min-h-screen bg-gray-200`}>
      <div className="container mx-auto">
        <h3 className="text-center py-10 text-3xl text-gray-600">
          Here are some of the most popular chess players and Youtube
          personalities
        </h3>
        <div className="grid grid-cols-3">
          {data.map((player, i) => (
            <a
              key={i}
              href={player.wikiURL}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer p-5 hover:bg-gray-100 mx-10 mb-8 border-gray-300 border rounded shadow-lg"
            >
              <p className="text-justify mb-5 text-gray-600">{player.quote}</p>
              <p className="text-right mb-5 text-gray-500">- {player.name}</p>
              <img
                className="mx-auto"
                height="300"
                src={player.imageURL}
                alt="gary_kasparov"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FamousPlayersSection;
