import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { forwardRef } from "react";

const ImageGallery = forwardRef(({ images, onClick }, ref) => {
  return (
    <ul ref={ref} className={css.gallery}>
      {images.map((image) => {
        return (
          <li className={css.galleryItem} key={image.id}>
            <div onClick={() => onClick(image.urls.regular)}>
              <ImageCard image={image} />
            </div>
          </li>
        );
      })}
    </ul>
  );
});

ImageGallery.displayName = "ImageGallery";

export default ImageGallery;
