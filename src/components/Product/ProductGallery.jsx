import React, { useState } from 'react';
import './styles.css';

function ProductGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="product-gallery" data-testid="product-gallery">
      <div className="main-image">
        <img src={images[currentIndex]} alt={`Product view ${currentIndex + 1}`} />
        {images.length > 1 && (
          <>
            <button className="nav-button prev" onClick={prevImage}>
              &lt;
            </button>
            <button className="nav-button next" onClick={nextImage}>
              &gt;
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="thumbnail-container">
          {images.map((image, index) => (
            <div 
              key={index}
              className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;