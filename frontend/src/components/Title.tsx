import React from 'react';
import LazyLoad from 'react-lazyload';
import Logo from './logo_0P5.webp';
import './Title.css';

const Title = () => {
  return (
    <div className="title-container">
      <LazyLoad className="lazyload-title" once>
        <img src={Logo} className="title" alt="0penPrivate5earch" />
      </LazyLoad>
    </div>
  );
}

export default Title;
