import React, { useEffect, useState } from "react";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import typography from "../../utils/typography";
import DefaultAlert from "../DefaultAlert/DefaultAlert";
import DefaultCover from "../DefaultCover/DefaultCover";
import Loading from "../Loading/Loading";
import "./Purchases.css";

function Purchases() {
  const [purchases, setPurchases] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    text: null,
    isSuccess: true,
  });

  useEffect(() => {
    async function getPurchases() {
      setLoading(true);
      const response = await fetchDataWithAuth(
        "/users/songs/getPurchasedSongs",
        "GET"
      );
      if (response?.data) {
        showAlert(response?.message, true);
        assignBackgroundColors(response.data);
        setPurchases(response.data);
      } else {
        showAlert(response?.message, false);
      }
      setLoading(false);
    }
    getPurchases();
  }, []);

  const assignBackgroundColors = (purchases) => {
    purchases.forEach((purchase) => {
      purchase.color = generateColor();
    });
  };

  const generateColor = () => {
    const RGBValue = () => Math.floor(Math.random() * 255);
    return `rgba(${RGBValue()}, ${RGBValue()}, ${RGBValue()}, 0.8)`;
  };

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

  const dateToGreeting = () => {
    const hour = new Date().getUTCHours();
    if (hour > 2 && hour < 12) {
      return "morning";
    } else if (hour > 12 && hour < 6) {
      return "afternoon";
    }
    return "evening";
  };

  return (
    <div>
      {message?.text && (
        <DefaultAlert
          message={message.text}
          severity={message?.isSuccess ? "success" : "error"}
        />
      )}
      {loading ? (
        <Loading />
      ) : (
        <div style={{ fontSize: typography.header }}>
          {`Good ${dateToGreeting()}, here are your purchased songs`}
          <div className="purchase-container">
            {purchases &&
              purchases.map((purchase) => {
                return <div>{<DefaultCover backround={purchase.color} />}</div>;
              })}
          </div>
        </div>
      )}
    </div>
  );
}

const purchaseContainerStyle = {
  display: "grid",
  gridGap: "20px",
  gridTemplateColumns: "",
};

export default Purchases;
