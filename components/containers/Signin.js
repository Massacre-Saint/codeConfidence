import Image from 'next/image';
import React from 'react';
import { IconContext } from 'react-icons';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import AuthenticationButton from '../buttons/Authentication';

export default function Signin() {
  return (
    <div className="sign_in-container">
      <div className="sign_in-content">
        <div>
          <h1>Welcome to Code Confidence</h1>
          <p className="fnt-danger">This application is currently only developed for desktop.</p>
          <p className="fnt-secondary margin-btm">Code Confidence was designed for users who are learning new technologies! With this app you&apos;ll be able to:</p>
        </div>
        <div className="grid-checklist">
          <span className="checklist-content">
            <span>
              <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                <IoCheckmarkCircleSharp />
              </IconContext.Provider>
            </span>
            <div className="checklist-text"> Import and assign bookmarks.</div>
          </span>
          <span className="checklist-content">
            <span>
              <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                <IoCheckmarkCircleSharp />
              </IconContext.Provider>
            </span>
            <div className="checklist-text">Stay motivated with positive affirmations!</div>
          </span>
          <span className="checklist-content">
            <span>
              <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                <IoCheckmarkCircleSharp />
              </IconContext.Provider>
            </span>
            <div className="checklist-text">Track the progress of your learning goals.</div>
          </span>
          <span className="checklist-content">
            <span>
              <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                <IoCheckmarkCircleSharp />
              </IconContext.Provider>
            </span>
            <div className="checklist-text">Create goals and topics for the technology you&apos;re learning!</div>
          </span>
          <span className="checklist-content">
            <span>
              <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                <IoCheckmarkCircleSharp />
              </IconContext.Provider>
            </span>
            <div className="checklist-text"> Track the many programming languages, frameworks, and libraries</div>
          </span>
          <span className="checklist-content">
            <span>
              <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                <IoCheckmarkCircleSharp />
              </IconContext.Provider>
            </span>
            <div className="checklist-text">  Many more!</div>
          </span>
        </div>
        <div className="sign-in_button_container">
          <AuthenticationButton />
        </div>
      </div>
      <div className="sign_in-content">
        <div className="logo">
          <Image
            className="image-logo"
            src="/logo.v2.svg"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
