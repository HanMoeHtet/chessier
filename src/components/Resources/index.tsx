import React from 'react';
import { channels, sites } from './data';

const Resources: React.FC = () => {
  return (
    <section className={`w-full`}>
      <div className="container mx-auto p-10">
        <div className="grid grid-cols-2">
          <div className="border bg-gray-200 mx-10 rounded-lg">
            <h3 className="text-2xl text-center text-gray-500 py-5">
              Popular chess websites and Youtube channels
            </h3>
            <div className="container mx-5">
              {sites.map((site, i) => (
                <div key={i}>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center mb-5 text-gray-600 hover:underline hover:text-gray-800"
                  >
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${site.url}`}
                      style={{ width: 16, height: 16 }}
                      className="mr-2"
                      alt={site.name}
                    />
                    <span>{site.name}</span>
                  </a>
                </div>
              ))}
              {channels.map((channel, i) => (
                <div key={i}>
                  <a
                    href={channel.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center mb-5 text-gray-600 hover:underline hover:text-gray-800"
                  >
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${channel.url}`}
                      style={{ width: 16, height: 16 }}
                      className="mr-2"
                      alt={channel.name}
                    />
                    <span>{channel.name}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube-nocookie.com/embed/1Cm_uE4b5jE?start=4789"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
