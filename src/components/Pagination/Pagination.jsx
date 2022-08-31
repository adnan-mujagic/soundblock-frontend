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
    return Math.ceil(totalItems / limit);
  };

  const handleFirstPage = () => {
    setPage(1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handleLastPage = () => {
    setPage(getLastPage());
  };

  if (getLastPage() === 1) {
    return null;
  }

  return (
    <div className={styles["pagination"]}>
      <div className={styles["removable"]}>
        Showing page {page} of {getLastPage()}
      </div>

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
