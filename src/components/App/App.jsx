import SearchBar from "../SearchBar/SearchBar";
import { fetchImages } from "../../images-api";
import { useEffect, useRef, useState } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ImageModal from "../ImageModal/ImageModal";

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function getData() {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchImages(query, page);
        setImages((prevImages) => {
          return [...prevImages, ...data.results];
        });
        setShowBtn(data.total_pages && data.total_pages !== page);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [page, query]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);

    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
    window.scrollBy(0, window.innerHeight);
  };

  const handleScroll = () => {
    const dims = listRef.current.getBoundingClientRect();
    window.scrollTo({
      top: dims.height,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (listRef.current != null) {
      handleScroll();
    }
  }, [images]);

  const openModal = (url) => {
    console.log("opening");
    setIsOpen(true);
    setImgUrl(url);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      {images.length > 0 && (
        <ImageGallery onClick={openModal} ref={listRef} images={images} />
      )}
      {images.length > 0 && !loading && showBtn && (
        <LoadMoreBtn clickFunction={handleLoadMore} />
      )}
      {loading && <Loader />}
      {modalIsOpen && (
        <ImageModal
          url={imgUrl}
          closeModal={closeModal}
          modalIsOpen={modalIsOpen}
        />
      )}
    </>
  );
};

export default App;
