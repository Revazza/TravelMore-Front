import React from "react";
import Button from "../Button";
import styles from "./Pagination.module.css";

function Pagination({
  itemsPerPage,
  totalPageNumber,
  onPageClick,
  currentPage,
}) {
  const division = totalPageNumber / itemsPerPage;
  let pages = [];

  for (let i = 1; i <= Math.ceil(division); i++)  pages.push(i);

  const onButtonClick = (event) => {
    onPageClick(+event.target.id);
  };

  return (
    <div className={styles.wrapper}>
      {pages.map((page) => {
        return (
          <Button
            type="button"
            className={currentPage !== page && styles.inactive_pagination}
            title={page}
            id={page}
            onClick={onButtonClick}
            key={page}
          />
        );
      })}
    </div>
  );
}

export default Pagination;
