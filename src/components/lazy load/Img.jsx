import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import React from "react";

const Img = ({ src, alt, className, placeholderSrc, ...props }) => {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect="blur"
      placeholderSrc={placeholderSrc}
      className={className}
      {...props}
    />
  );
};

export default Img;
