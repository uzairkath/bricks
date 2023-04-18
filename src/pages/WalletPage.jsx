import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { WalletChart } from "../components";
import "./walletpage.css";

import { PieChart, Pie, } from "recharts";
import { BsFillTriangleFill } from "react-icons/bs";
import { ReferralContext } from "../context/Referral";
import { BigNumber, ethers } from "ethers";
import apis from "../services";





const Wallet = () => {

  const { rocksBalance, myBricksBalance, myUsdBalance, pairBalance, bricksPrice, rocksPrice, myUsdPrice, lPPrice, currentAccount, sendMetaMaskAddress,
    getRocksBalance,
    getMyUsdBalance,
    getPairBalance,
    getRocksPrice,
    getMyBricksBalance,
    getBricksPrice,
    getmyUSDPrice,
    getLPTokenPrice } = useContext(ReferralContext)
  const data = [
    { name: "Group A", value: rocksBalance * rocksPrice, fill: "#0088FE" },
    { name: "Group B", value: myBricksBalance * bricksPrice, fill: "#00C49F" },
    { name: "Group C", value: myUsdBalance * myUsdPrice, fill: "#FFBB28" },
    { name: "Group D", value: pairBalance * lPPrice, fill: "#FF8042" },
  ];
  const [_data, setData] = useState()
  const [duration, setDuration] = useState(1)

  useEffect(() => {
    (async()=>{
      if (currentAccount) {
       await getData()
      } 
    })()
    
  }, [currentAccount, duration])


  useEffect(() => {
    (async () => {
      if (currentAccount) {
        const res1 = await getRocksBalance(currentAccount);
        const res2 = await getMyUsdBalance(currentAccount);
        const res3 = await getPairBalance(currentAccount);
        const res4 = await getRocksPrice();
        const res5 = await getMyBricksBalance(currentAccount);
        const res6 = await getBricksPrice();
        const res7 = await getmyUSDPrice();
        const res8 = await getLPTokenPrice();
        let temp = parseFloat(((res1 * res4) + (res2 * res7) + (res3 * res8) + (res5 * 0.00024))).toFixed(2)
        console.log("ERABeEB", res1, res2, res3, res4, res5, res6, res7, res8)
        console.log("ERABeEB", temp)
        await sendMetaMaskAddress(currentAccount, temp)
      }
    })()
  }, [currentAccount])

  const getData = async () => {
    const body = {
      walletAddress: currentAccount,
      duration
    }
    const response = await apis.getPortfolioValues(body)
    setData(response.data)
    console.log(response, "ress")
  }
  console.log(_data, "asas")

  return (
    <>
      <div className="page-styles wallet-page">
        <Container>
          <Row className="reverse-column-xs">
            <Col sm={6}>
              <p className="normal-para">Portfolio Value</p>
              <p className="larger-para fw-bold">${parseFloat(((rocksBalance * rocksPrice) + (myUsdBalance * myUsdPrice) + (pairBalance * lPPrice) + (myBricksBalance * bricksPrice))).toFixed(2)}</p>
              <p className="normal-para muted-dark pt-4  pb-2">Hour change</p>
              <div className="flex-wrap-items shrink pb-sm-0 pb-5">
                <BsFillTriangleFill className="primary" />
                <p className="larger-para fw-bold">
                  $388.15<span className="small-para">(3.29%)</span>
                </p>
              </div>
            </Col>
            <Col sm={6}>
              <div className="wallet-donut-chart d-flex py-4 py-sm-0 pe-sm-5">
                <PieChart width={180} height={180} className="me-auto ms-auto me-sm-0">
                  <text
                    x={"50%"}
                    y={80}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="large-para fw-bold blue"
                  >
                    4
                  </text>
                  <text
                    x={"50%"}
                    y={100}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="normal-para blue"
                  >
                    Assets
                  </text>
                  {/* <Legend
                    height={36}
                    iconType="circle"
                    layout="vertical"
                    verticalAlign="middle"
                    iconSize={10}
                    padding={5}
                  /> */}
                  <Pie
                    data={data}
                    cx={"50%"}
                    cy={"50%"}
                    innerRadius="85%"
                    outerRadius="100%"
                    fill="#8884d8"
                    paddingAngle={0}
                    dataKey="value"
                  ></Pie>
                </PieChart>
              </div>
            </Col>
          </Row>
          {
            _data == undefined || _data?.length == 0 ?
              ""
              :
              <WalletChart setDuration={setDuration} _data={_data} />
          }

          <div className="flex-wrap-items shrink py-3">
            <button className="normal-para fw-semibold">Overview</button>
            <button className="normal-para muted fw-semibold">
              Recent Transactions
            </button>
          </div>
          <div className="scroll-x">
            <div className="custom-table alternate-theme">
              <table>
                <thead>
                  <tr>
                    <th className="normal-para muted">Asset</th>
                    <th className="normal-para muted">Amount</th>
                    <th className="normal-para muted">Current USD</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="normal-para">
                      <div className="flex-wrap-items shrink">
                        <img
                          src="assets/images/my_rocks_icon.svg"
                          alt=""
                          className="small-icon"
                        />
                        <span>Rocks</span>
                      </div>
                    </td>
                    <td className="normal-para">{rocksBalance < 1 ? "0" : rocksBalance}</td>
                    <td className="normal-para">${rocksBalance * rocksPrice}</td>
                  </tr>
                  <tr>
                    <td className="normal-para">
                      <div className="flex-wrap-items shrink">
                        <img
                          src="assets/images/usd_badge.svg"
                          alt=""
                          className="small-icon"
                        />
                        <span>MyUSD</span>
                      </div>
                    </td>
                    <td className="normal-para">{myUsdBalance < 1 ? "0" : parseFloat(myUsdBalance).toFixed(2)}</td>
                    <td className="normal-para">${parseFloat(myUsdBalance * myUsdPrice).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="normal-para">
                      <div className="flex-wrap-items shrink">
                        <img
                          src="/assets/images/amount_icon.svg"
                          alt=""
                          className="small-icon"
                        />
                        <span>LP Tokens</span>
                      </div>
                    </td>
                    <td className="normal-para">{pairBalance && pairBalance == 0 ? "0" : parseFloat(pairBalance).toFixed(2)}</td>
                    <td className="normal-para">${parseFloat(pairBalance * lPPrice).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="normal-para">
                      <div className="flex-wrap-items shrink">
                        <img
                          src="assets/images/bricks_icon_orange.svg"
                          alt=""
                          className="small-icon"
                        />
                        <span>Bricks</span>
                      </div>
                    </td>
                    <td className="normal-para">{myBricksBalance && myBricksBalance == 0 ? "0" : parseFloat(myBricksBalance).toFixed(2)}</td>
                    <td className="normal-para">${parseFloat(myBricksBalance * bricksPrice).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </div>

    </>
  );
};

export default Wallet;