import React from "react";
import { Col, Row } from "react-bootstrap";

const WalletCard = () => {
  return (
    <>
      <div className="wallet-card-wrapper">
        <article className="wallet-card">
          <Row>
            <Col md={6} className="pb-3">
              <p className="normal-para grey">Portfolio Value</p>
              <p className="large-para">=€1.903 GBP</p>
            </Col>
            <Col md={6} className="pb-3">
              <p className="normal-para grey">Last updated 14:20 19/01/2023</p>
            </Col>
            <Col md={6}>
              <div className="db-item">
                <div className="icon bg-icon">
                  <img src="assets/images/bond_icon.svg" alt="" />
                </div>
                <div>
                  <p className="large-para">
                    $00.00 <span className="small">BRICKS</span>
                  </p>
                  <p className="small-para grey">=€1.903 GBP</p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="db-item">
                <div className="icon bg-icon">
                  <img src="assets/images/bond_icon.svg" alt="" />
                </div>
                <div>
                  <p className="large-para">
                    $00.00 <span className="small">BRICKS</span>
                  </p>
                  <p className="small-para grey">=€1.903 GBP</p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="db-item">
                <div className="icon bg-icon">
                  <img src="assets/images/bond_icon.svg" alt="" />
                </div>
                <div>
                  <p className="large-para">
                    $00.00 <span className="small">BRICKS</span>
                  </p>
                  <p className="small-para grey">=€1.903 GBP</p>
                </div>
              </div>
            </Col>
          </Row>
        </article>
      </div>
    </>
  );
};

export default WalletCard;
