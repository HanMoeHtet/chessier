import Tippy from '@tippyjs/react';
import React from 'react';
import { Link } from 'react-router-dom';
import ClipboardButton from '../ClipboardButton';
import ContactForm from '../ContactForm';
import IconButton from '../IconButton';
import ClipboardIcon from '../utils/ClipboardIcon';
import EmailIcon from '../utils/EmailIcon';
import FacebookIcon from '../utils/FacebookIcon';
import GithubIcon from '../utils/GithubIcon';
import PhoneIcon from '../utils/PhoneIcon';
import * as data from './data';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-800">
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-2">
          <div className="text-gray-500 flex flex-col">
            <h3 className="text-3xl mb-10 text-gray-500">Contact</h3>
            <div className="flex items-center mb-2">
              <div className="mr-3">
                <PhoneIcon width="16px" color="#6b7280" />
              </div>
              <a href={`tel:${data.phoneNumber}`} className="mr-3">
                {data.phoneNumber}
              </a>
              <ClipboardButton textToCopy={data.phoneNumber} />
            </div>
            <div className="flex items-center mb-2">
              <div className="mr-3">
                <EmailIcon width="16px" color="#6b7280" />
              </div>
              <a href={`mailto:${data.email}`} className="mr-3">
                {data.email}
              </a>
              <ClipboardButton textToCopy={data.email} />
            </div>
            <div className="flex mt-5">
              <a
                href="https://github.com/HanMoeHtet"
                target="_blank"
                rel="noreferrer"
                className="mr-5"
              >
                <IconButton
                  Icon={GithubIcon}
                  backgroundColor="currentColor"
                  activeBackgroundColor="white"
                />
              </a>
              <a
                href="https://facebook.com/han.m.htet.79"
                target="_blank"
                rel="noreferrer"
                className="mr-5"
              >
                <IconButton
                  Icon={FacebookIcon}
                  backgroundColor="currentColor"
                  color="#1f2937"
                  activeColor="white"
                />
              </a>
            </div>
            <div className="mt-auto flex mb-4">
              <div className="mr-4 hover:text-gray-200 hover:underline">
                <Link to="/about">About</Link>
              </div>
              <div className="mr-4 hover:text-gray-200 hover:underline">
                <Link to="/terms">Terms</Link>
              </div>
              <div className="mr-4 hover:text-gray-200 hover:underline">
                <Link to="/policies">Privacy Policies</Link>
              </div>
            </div>
            <div className="">&copy; 2020 Chessier. All rights reserved.</div>
          </div>

          <div className="text-gray-500">
            <ContactForm />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
