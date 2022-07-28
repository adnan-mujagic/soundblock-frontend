import React from "react";

function EthereumLogo({ height = 20 }) {
  return (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png"
      style={{
        height: `${height}px`,
      }}
    />
  );
}

export default EthereumLogo;
