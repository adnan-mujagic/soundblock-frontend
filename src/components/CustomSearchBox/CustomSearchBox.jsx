import React, { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import CustomTextField from "../CustomTextField/CustomTextField";
import styles from "./CustomSearchBox.module.scss";

function CustomSearchBox({ setData, setTotal, page, setPage, limit }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    setPage(1);
    getSongsByName(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    console.log("Executing");
    getSongsByName(page);
  }, [page]);

  const getSongsByName = async (page) => {
    if (debouncedSearchTerm) {
      console.log("Searching...");
      setLoading(true);
      try {
        const { data, count } = await fetchDataWithAuth(
          `/songs/getByName?page=${page}&limit=${limit}&name=${debouncedSearchTerm}`,
          "GET"
        );
        setLoading(false);
        setData(data);
        setTotal(count);
      } catch (error) {
        setLoading(false);
      }
    } else {
      setData([]);
    }
  };

  return (
    <div className={styles["search-box"]}>
      <CustomTextField
        placeholder="Search"
        text={searchTerm}
        setText={setSearchTerm}
      />
    </div>
  );
}

export default CustomSearchBox;
