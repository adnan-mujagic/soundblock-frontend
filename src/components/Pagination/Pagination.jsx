import React from "react";
import PropTypes from "prop-types";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import styles from "./Pagination.module.scss";
import { IconButton } from "@mui/material";

function Pagination({ totalItems, page, setPage, limit = 5, setLimit }) {
  const getLastPage = () => {
    const lastPage = Math.ceil(totalItems / limit);
    console.log(lastPage);
    return lastPage;
  };

  const handleFirstPage = () => {};

  const handlePreviousPage = () => {};

  const handleNextPage = () => {};

  const handleLastPage = () => {};
  return (
    <div className={styles["pagination"]}>
      Showing page {page} of {getLastPage()}
      <IconButton disabled={page === 1} onClick={handleFirstPage}>
        <FirstPageIcon />
      </IconButton>
      <IconButton disabled={page === 1} onClick={handlePreviousPage}>
        <ChevronLeftIcon />
      </IconButton>
      <IconButton disabled={page === getLastPage()} onClick={handleNextPage}>
        <ChevronRightIcon />
      </IconButton>
      <IconButton disabled={page === getLastPage()} onClick={handleLastPage}>
        <LastPageIcon />
      </IconButton>
    </div>
  );
}

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  limit: PropTypes.number,
  setLimit: PropTypes.func,
};

export default Pagination;
