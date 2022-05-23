import React, { useEffect, useState } from "react";
import ContentType from "../../components/ContentType/ContentType";
import Header from "../../components/Header";
import Loading from "../../components/Loading/Loading";
import Sidebar from "../../components/Sidebar/Sidebar";
import dateToGreeting from "../../utils/dateToGreeting";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import typography from "../../utils/typography";
import styles from "./Account.module.scss";

function Account({ token, setToken }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState({
    text: null,
    isSuccess: true,
  });

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      const result = await fetchDataWithAuth("/users", "GET");
      if (result?.data) {
        setUser(result.data);
      }
      setLoading(false);
    }
    getUser();
  }, []);

  const showAlert = (message, isSuccess) => {
    setMessage({
      text: message,
      isSuccess: true,
    });

    setTimeout(() => {
      setMessage({
        text: null,
        isSuccess: isSuccess,
      });
    }, 2000);
  };

  return (
    <div className={styles.account}>
      <Header token={token} setToken={setToken} />
      <div className={styles["content-wrapper"]}>
        <Sidebar />
        <div className={styles["main-content-wrapper"]}>
          <ContentType contentType={"Your Account"} />
          {user && user.username ? (
            <div
              style={{ fontSize: typography.header, marginTop: "20px" }}
            >{`Good ${dateToGreeting()} ${user.username}`}</div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
