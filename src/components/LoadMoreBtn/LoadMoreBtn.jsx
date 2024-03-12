import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ clickFunction }) => {
  return (
    <button className={css.button} onClick={clickFunction}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
