import React from "react";
import "./appbar.css";
import { BsGithub, BsLinkedin } from "react-icons/bs";

export default function AppBar() {
  return (
    <header>
      <div>
        <div className='appbar-logo'>BENGI</div>
        <div className='appbar-actions'>
          <a
            href='https://www.linkedin.com/in/dorbengi'
            target='_blank'
            rel='noopener noreferrer'
          >
            <BsLinkedin />
          </a>
          <a
            href='https://github.com/theBigBengi/bondsports'
            target='_blank'
            rel='noopener noreferrer'
          >
            <BsGithub />
          </a>
          {/* <div>theme</div> */}
        </div>
      </div>
    </header>
  );
}
