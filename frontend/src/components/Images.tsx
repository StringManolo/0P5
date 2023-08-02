import React, { useState } from 'react';

const Image: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  }

  const handleImageError = () => {
    setImageLoaded(true);
  }

  return (
    <div>
      {!imageLoaded && <div>Loading...</div>}

      <img 
        src="#" 
        alt="#"
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: imageLoaded ? 'block' : 'none' }}
      />
    </div>
  )
}

export default Image;
