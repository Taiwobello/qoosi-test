import React, { useState } from "react";
import styles from "./Paginate.module.scss";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleClick = (number: number) => {
    setCurrentPage(number);
    paginate(number);
  };

  const handleNext = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      paginate(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      paginate(currentPage - 1);
    }
  };

  return (
    <div className={styles["paginate-wrapper"]}>
      <div
        onClick={handlePrev}
        className={[
          styles["page-control"],
          styles.previous,
          currentPage === 1 && styles.invalid,
        ].join(" ")}
      >
        Previous
      </div>
      <ul className={styles.pagination}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={[currentPage === number ? styles.active : ""].join(" ")}
            onClick={() => handleClick(number)}
          >
            {number}
          </button>
        ))}
      </ul>
      <div
        onClick={handleNext}
        className={[
          styles["page-control"],
          styles.next,
          (!pageNumbers || currentPage === pageNumbers.length) &&
            styles.invalid,
        ].join(" ")}
      >
        Next
      </div>
    </div>
  );
};

export default Pagination;
