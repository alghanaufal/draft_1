import React from "react";

const GallerySection = ({ ref9, inView9, images, bgImage }) => {
  return (
    <div className="p-10" style={{ backgroundImage: `url(${bgImage})` }}>
      <h3 className="text-2xl md:text-4xl font-serif font-bold mb-4">
        Galeri Kami
      </h3>
      <div
        ref={ref9} // Ref untuk Intersection Observer
        className={`gallery ${inView9 ? "animate-fade-in-up" : ""}`} // Tambahkan class animasi saat inView true
      >
        {images.map((img, index) => (
          <div key={index} className="gallery-item">
            <img src={img} alt={`Foto ${index + 1}`} className="gallery-img" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GallerySection;
