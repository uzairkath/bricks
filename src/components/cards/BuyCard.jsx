import React, { useContext, useState } from "react";
import { ReferralContext } from "../../context/Referral";
import PrimarySelector from "../others/PrimarySelector";

const BuyCard = ({ openModal, setCrypto, setFiat, setSelection }) => {
  const { buyRock, setQuantity, quantity, loading } =
    useContext(ReferralContext);

  const handleSelection = (entry) => {
    setSelection(entry);
    openModal();
  };

  return (
    <>
      <article className="buy-card bg-light-transparent primary-border-radius">
        <div className="buy-card-h bg-white p-3">
          <div className="flex-wrap-items shrink justify-content-center">
            <img
              src="assets/images/my_rocks_icon.svg"
              alt=""
              style={{ height: "50px" }}
              className="option-icon"
            />
            <p className="large-para text-center">Buy ROCKS</p>
          </div>
        </div>
        <div className="buy-card-body d-flex flex-column align-items-center py-3">
          {/* <PrimarySelector
            className="w-75"
            data={selectorData}
            selection={selection}
            handleSelection={handleSelection}
          /> */}
          {/* <p className="my-4 main-title text-center">$1000</p> */}
          {/* <input value={quantity} placeholder="Quantity" type="number" step="1"  className=" w-75 text-center mb-3" onChange={(e)=>setQuantity(e.target.value)} disabled={loading} /> */}

          <button
            className="button w-75 mb-4 text-center"
            onClick={() => {
              handleSelection(1, "rocks via card");
              setCrypto(false);
              setFiat(true);
            }}
            disabled={loading}
          >
            Buy With Fiat
          </button>
          <button
            className="button w-75 text-center"
            onClick={() => {
              handleSelection(1, "rocks via crypto");
              setCrypto(true);
              setFiat(false);
            }}
            disabled={loading}
          >
            Buy With Crypto
          </button>
        </div>
      </article>
    </>
  );
};

export default BuyCard;
