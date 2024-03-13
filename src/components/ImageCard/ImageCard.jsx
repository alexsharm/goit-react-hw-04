import css from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => {
  return (
    <div>
      <img
        onClick={() => onClick(image.urls.regular)}
        className={css.galleryImage}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard;
