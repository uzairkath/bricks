import React from "react";

const ValueItem = ({ data }) => {
  const { icon, equation, desc } = data;
  return (
    <>
      <div className="value-item">
        <div className="flex-wrap-items shrink">
          <img src={icon} alt="icon" className="icon" />
          <p className="normal-para fw-bold">{equation}</p>
        </div>
        <p className="normal-para">{desc}</p>
      </div>
    </>
  );
};

export default ValueItem;
