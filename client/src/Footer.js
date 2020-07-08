import React, { Component } from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './css/Home.css';
import './css/skeleton.css';
import './css/normalize.css';

const Footer = () => (
  <div className="footer-credentials">
    <div className="left-credentials-element">
      <p>Created by: Neil Tengbumroong<br/>Epic ID: Neiliooo</p>
    </div>
    <div className="right-credentials-element">
      <p>API provided by: <a href="https://fortniteapi.io/">FortniteAPI.io</a></p>
      <a 
        href="https://github.com/neiltengbumroong/Fortnite-Plus"
        target="_blank"
        style={{color: 'white', padding: 0, margin: '-10%'}}
      >
          <FontAwesomeIcon
            className="search-icon"
            icon={faGithub} 
            size="lg" 
          />
      </a>
    </div>
  </div>
);

export default Footer;