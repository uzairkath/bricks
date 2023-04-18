import * as React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import rockImg from '@assets/images/rock_img.svg';
import { BsArrowDown, BsArrowRight } from 'react-icons/bs';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { BecomeNFTHolder, NFTBuyCard } from '@components/NFTMint';
// import { BuyCard } from "../components";
// import { ReferralContext } from "../context/Referral";
// import useLocalStorage from "../hooks/useLocalStorage";
// import apis from "../services";

const RockImage = styled.img(
	css({
		width: 250,
		'@media (min-width: 768px)': {
			width: 300,
		},
		'@media (min-width: 1200px)': {
			width: 500,
		},
	})
);

export const NFTMint: React.FC = () => {
	const selectorData = [
		// {
		//   label: "BRICKS",
		//   icon: "assets/images/bricks_icon_orange.svg",
		// },
		// {
		//   label: "MyUSD",
		//   icon: "assets/images/usd_badge.svg",
		// },
		{
			label: 'USDC',
			icon: 'assets/images/usdc.png',
		},
	];
	// const [selection, setSelection] = useState(selectorData[0]);
	// const [user] = useLocalStorage("user", null);
	// const [purchaseShow, setPurchaseShow] = useState(false);
	// const [purchaseSelection, setPurchaseSelection] = useState("");
	// const [purchaseStep, setPurchaseStep] = useState(0);
	// const [value, setValue] = useState(0);
	// const [amount, setAmount] = useState(0);
	// const [estimate, setEstimate] = useState("");

	// const [value2, setValue2] = useState(0);
	// const [amount2, setAmount2] = useState(0);
	// const [estimate2, setEstimate2] = useState("");

	// const [value3, setValue3] = useState(0);
	// const [amount3, setAmount3] = useState(0);
	// const [estimate3, setEstimate3] = useState("");

	// const [crypto, setCrypto] = useState(false);
	// const [fiat, setFiat] = useState(false);

	// const [link, setLink] = useState("");
	// const {
	//   loading,
	//   swapBricksTokens,
	//   checkAmount,
	//   getBalance,
	//   getBalance2,
	//   getBalance3,
	//   currentAccount,
	//   swapUSDCTokens,
	//   swapMyUSDTokens,
	//   checkAmount2,
	//   checkAmount3,
	//   buyRock,
	//   setQuantity,
	//   quantity,
	// } = useContext(ReferralContext);

	// const handleSelection = (step, choice) => {
	//   setPurchaseStep(step);
	//   setPurchaseSelection(choice);
	// };

	// const handlePurchaseShow = () => {
	//   setPurchaseShow(true);
	// };

	// const handlePurchaseHide = () => {
	//   setPurchaseShow(false);
	//   setPurchaseStep(0);
	//   setAmount2("");
	//   setEstimate2("");
	//   setAmount3("");
	//   setEstimate3("");
	//   setValue2("");
	//   setValue3("");
	// };

	// const getamount = async (e) => {
	//   setEstimate(e.target.value);
	//   setValue("");
	//   setAmount(e.target.value);
	//   const res = await checkAmount(e.target.value);
	//   setValue(res);
	// };

	// const getamount2 = async (e) => {
	//   setEstimate2(e.target.value);
	//   setValue2("");
	//   setAmount2(e.target.value);
	//   const res = await checkAmount2(e.target.value);
	//   console.log("++++", res);
	//   setValue2(res);
	// };

	// const getamount3 = async (e) => {
	//   setEstimate3(e.target.value);
	//   setValue3("");
	//   setAmount3(e.target.value);
	//   const res = await checkAmount3(e.target.value);
	//   setValue3(res);
	// };

	// const swapBRICKS = async () => {
	//   await swapBricksTokens(amount);
	//   setValue("");
	//   setAmount("");
	//   setEstimate("");
	// };

	// const swapMyUSD = async () => {
	//   const res = await swapMyUSDTokens(amount2);
	//   setValue2("");
	//   setAmount2("");
	//   setEstimate2("");
	//   console.log("Hello MyUSD");
	// };

	// const swapUSDC = async () => {
	//   const res = await swapUSDCTokens(amount3);
	//   if (res == true) {
	//     setValue3("");
	//     setAmount3("");
	//     setEstimate3("");
	//     handleSelection(1, "rocks via usdc");
	//   }
	//   console.log("Hello USDC");
	// };

	// const balance = async () => {
	//   const res1 = await getBalance();
	//   setEstimate(res1);
	//   setAmount(res1);
	//   const res = await checkAmount(res1);
	//   setValue(res);
	// };

	// const balance2 = async () => {
	//   const res1 = await getBalance2();
	//   setEstimate2(res1);
	//   setAmount2(res1);
	//   const res = await checkAmount2(res1);
	//   setValue2(res);
	// };

	// const balance3 = async () => {
	//   const res1 = await getBalance3();
	//   setEstimate3(res1);
	//   setAmount3(res1);
	//   const res = await checkAmount3(res1);
	//   setValue3(res);
	// };

	// const moon = async () => {
	//   handleSelection(1, "rocks via card");
	//   try {
	//     const body = {
	//       email: user?.email,
	//       walletAddress: currentAccount,
	//     };
	//     const response = await apis.getBNBTransaction(body);
	//     setLink(response.data.data);
	//     console.log("Done", response.data.data);
	//   } catch (err) {
	//     console.log("Error", err);
	//   }
	// };
	return (
		<Box
			sx={{
				py: 10,
				minHeight: '100%',
				background:
					'linear-gradient(45.16deg, #D7EDFE 11.47%, #FFFFFF 45.37%, #FFFFFF 66.25%, #FFDACB 93.55%)',
			}}
		>
			<Container>
				<Typography
					sx={{
						fontWeight: 700,
						fontSize: '1.8rem',
						lineHeight: '2rem',
						color: 'var(--main)',
					}}
				>
					NFT MINT
				</Typography>
				<Grid container>
					<Grid
						item
						xs={12}
						md={6}
						display="flex"
						alignItems="center"
						justifyContent="center"
					>
						<NFTBuyCard />
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
						display="flex"
						alignItems="center"
						justifyContent="center"
					>
						<RockImage src={rockImg} alt="" />
					</Grid>
					<Grid item xs={12} md={6}>
						<BecomeNFTHolder />
					</Grid>
				</Grid>
			</Container>
		</Box>
	);

	// return (
	//   <>
	//     <div className="page-styles nft-mint-page">
	//       <Container>
	//         <Row className="reverse-column-sm">
	//           <Col
	//             md={6}
	//             className="d-flex align-items-center justify-content-center"
	//           >
	//             <Row className="w-100">
	//               <Col lg={9}>
	//                 <BuyCard
	//                   openModal={handlePurchaseShow}
	//                   selectorData={selectorData}
	//                   selection={selection}
	//                   setSelection={setSelection}
	//                   setCrypto={setCrypto}
	//                   setFiat={setFiat}
	//                 />
	//               </Col>
	//             </Row>
	//           </Col>
	//           <Col md={6}>
	//             <img
	//               src="assets/images/rock_img.svg"
	//               className="w-100"
	//               alt="rock"
	//             />
	//           </Col>
	//         </Row>
	//         <p className="large-para pt-5 pt-md-3">Become a MyRocks NFT holder</p>
	//         <p className="normal-para">
	//           Once you become and MyRock Share (ROCKS) holder, You are now part of
	//           a very select group of investors with some pretty amazing perks.
	//           Let's dive in:
	//         </p>
	//         <p className="normal-para">
	//           1. Free Stay in UK (for now) with our NFT-based timeshare ownership.
	//         </p>
	//         <p className="normal-para">
	//           2. Returns of up to 60% APR from our protocol.
	//         </p>
	//         <p className="normal-para">
	//           3. No locking period. Exit your investment by selling your ROCKS in
	//           the open market.
	//         </p>
	//         <p className="normal-para">
	//           <span>
	//             <a href="#" className="fw-bold">
	//               Click here
	//             </a>
	//           </span>{" "}
	//           to learn how a Liquidity Pool works
	//         </p>
	//       </Container>

	//       <Modal
	//         className="custom-modal"
	//         show={purchaseShow}
	//         onHide={handlePurchaseHide}
	//         centered
	//       >
	//         <Modal.Header closeButton>
	//           {purchaseStep ? (
	//             <>
	//               <button
	//                 onClick={() => {
	//                   setPurchaseStep((prev) => prev - 1);
	//                 }}
	//               >
	//                 <FiArrowLeft />
	//               </button>
	//             </>
	//           ) : (
	//             <></>
	//           )}
	//         </Modal.Header>
	//         <Modal.Body className="pb-5 p-4">
	//           {/* Main page */}
	//           {!purchaseStep && (
	//             <>
	//               <p className="large-para fw-bold text-center pb-4">
	//                 Purchase Options
	//               </p>
	//               {fiat && (
	//                 <div
	//                   className="white-box compress-y py-5 mb-5"
	//                   onClick={moon}
	//                 >
	//                   <p className="para muted-dark text-center pb-4 dark fw-bold">
	//                     Buy BRICKS via card or bank transfer <br /> service
	//                     provided by &nbsp;
	//                     <span className="blue-link">Moonpay</span>
	//                   </p>
	//                   <div className="joint-list-x">
	//                     <article className="option-box">
	//                       <img
	//                         src="assets/images/cash.png"
	//                         alt=""
	//                         style={{ height: "40px", width: "50px" }}
	//                         className="option-icon"
	//                       />
	//                       <p className="sub-title fw-semibold">Fiat</p>
	//                     </article>
	//                     <article className="option-box shadowless">
	//                       <FiArrowRight />
	//                       <p className="sub-title fw-semibold">to</p>
	//                     </article>
	//                     <article className="option-box">
	//                       <img
	//                         src="assets/images/my_rocks_icon.svg"
	//                         alt=""
	//                         style={{ height: "50px" }}
	//                         className="option-icon"
	//                       />
	//                       <p className="sub-title fw-semibold">ROCKS</p>
	//                     </article>
	//                   </div>
	//                 </div>
	//               )}
	//               {crypto && (
	//                 <div
	//                   className="white-box compress-y py-5"
	//                   onClick={() => {
	//                     handleSelection(1, "rocks via crypto");
	//                   }}
	//                 >
	//                   <p className="para muted-dark text-center pb-4 dark fw-bold">
	//                     Swap BNB to USDC
	//                   </p>
	//                   <div className="joint-list-x">
	//                     <article className="option-box">
	//                       <img
	//                         src="assets/images/bnb_icon.svg"
	//                         alt=""
	//                         style={{ height: "50px" }}
	//                         className="option-icon"
	//                       />
	//                       <p className="sub-title fw-semibold">BNB</p>
	//                     </article>
	//                     <article className="option-box shadowless">
	//                       <FiArrowRight />
	//                       <p className="sub-title fw-semibold">to</p>
	//                     </article>
	//                     <article className="option-box">
	//                       {selection.label == "BRICKS" ? (
	//                         <img
	//                           src="assets/images/bricks_icon_orange.svg"
	//                           alt=""
	//                           className="option-icon"
	//                         />
	//                       ) : selection.label == "MyUSD" ? (
	//                         <img
	//                           src="assets/images/usd_badge.svg"
	//                           alt=""
	//                           className="option-icon"
	//                         />
	//                       ) : (
	//                         <img
	//                           src="assets/images/my_rocks_icon.svg"
	//                           alt=""
	//                           style={{ height: "50px" }}
	//                           className="option-icon"
	//                         />
	//                       )}

	//                       <p className="sub-title fw-semibold">ROCKS</p>
	//                     </article>
	//                   </div>
	//                 </div>
	//               )}
	//             </>
	//           )}

	//           {/* Bnb to Bricks  */}

	//           {purchaseStep === 1 && purchaseSelection === "bnb to bricks" && (
	//             <>
	//               <p className="large-para fw-bold text-center pb-4">
	//                 Swap BNB to USDC
	//               </p>
	//               <div className="white-box compress-y py-5">
	//                 <div className="center-xy">
	//                   <div className="w-100">
	//                     {/* <label className="normal-para text-end w-100">
	//                       Lorem, ipsum dolor.
	//                     </label> */}
	//                     {selection.label == "BRICKS" ? (
	//                       <div className="flex-input-group">
	//                         <input
	//                           type="text"
	//                           onChange={getamount}
	//                           value={estimate}
	//                           className="simple-input"
	//                           placeholder="min value 0.0005"
	//                           disabled={loading}
	//                         />
	//                         <div className="flex-wrap-items shrink-small">
	//                           <button className="blue" onClick={balance}>
	//                             Max
	//                           </button>
	//                           <img
	//                             src="assets/images/bnb_icon.svg"
	//                             alt=""
	//                             className="small-icon"
	//                           />
	//                           <p className="para">BNB</p>
	//                         </div>
	//                       </div>
	//                     ) : selection.label == "MyUSD" ? (
	//                       <div className="flex-input-group">
	//                         <input
	//                           type="text"
	//                           onChange={getamount2}
	//                           value={estimate2}
	//                           className="simple-input"
	//                           placeholder="min value 0.05"
	//                           disabled={loading}
	//                         />
	//                         <div className="flex-wrap-items shrink-small">
	//                           <button className="blue" onClick={balance2}>
	//                             Max
	//                           </button>
	//                           <img
	//                             src="assets/images/bnb_icon.svg"
	//                             alt=""
	//                             className="small-icon"
	//                           />
	//                           <p className="para">BNB</p>
	//                         </div>
	//                       </div>
	//                     ) : (
	//                       <div className="flex-input-group">
	//                         <input
	//                           type="text"
	//                           onChange={getamount3}
	//                           value={estimate3}
	//                           className="simple-input"
	//                           placeholder="min value 1"
	//                           disabled={loading}
	//                         />
	//                         <div className="flex-wrap-items shrink-small">
	//                           <button className="blue" onClick={balance3}>
	//                             Max
	//                           </button>
	//                           <img
	//                             src="assets/images/bnb_icon.svg"
	//                             alt=""
	//                             className="small-icon"
	//                           />
	//                           <p className="para">BNB</p>
	//                         </div>
	//                       </div>
	//                     )}
	//                   </div>
	//                   <BsArrowDown className="icon p-2 m-2 muted" />
	//                   {selection.label == "BRICKS" ? (
	//                     <div className="flex-input-group">
	//                       <input
	//                         type="text"
	//                         className="simple-input"
	//                         placeholder=""
	//                         value={value}
	//                         disabled={loading}
	//                       />
	//                       <div className="flex-wrap-items shrink-small">
	//                         <img
	//                           src="assets/images/usdc.png"
	//                           alt=""
	//                           className="small-icon"
	//                         />
	//                         <p className="normal-para">USDC</p>
	//                       </div>
	//                     </div>
	//                   ) : selection.label == "MyUSD" ? (
	//                     <div className="flex-input-group">
	//                       <input
	//                         type="text"
	//                         className="simple-input"
	//                         value={value2}
	//                         placeholder="MyUSD"
	//                         disabled={loading}
	//                       />
	//                       <div className="flex-wrap-items shrink-small">
	//                         <img
	//                           src="assets/images/usd_badge.svg"
	//                           alt=""
	//                           className="small-icon"
	//                         />
	//                         <p className="normal-para">MYUSD</p>
	//                       </div>
	//                     </div>
	//                   ) : (
	//                     <div className="flex-input-group">
	//                       <input
	//                         type="text"
	//                         value={value3}
	//                         className="simple-input"
	//                         placeholder="USDC"
	//                         disabled={loading}
	//                       />
	//                       <div className="flex-wrap-items shrink-small">
	//                         <img
	//                           src="assets/images/usdc.png"
	//                           alt=""
	//                           className="small-icon"
	//                         />
	//                         <p className="normal-para">USDC</p>
	//                       </div>
	//                     </div>
	//                   )}
	//                 </div>
	//               </div>
	//               <div className="center-x">
	//                 {selection.label == "BRICKS" ? (
	//                   <button
	//                     className="button alternate-button button-lg mt-5"
	//                     onClick={swapBRICKS}
	//                     disabled={loading}
	//                   >
	//                     Confirm
	//                   </button>
	//                 ) : selection.label == "MyUSD" ? (
	//                   <button
	//                     className="button alternate-button button-lg mt-5"
	//                     onClick={swapMyUSD}
	//                     disabled={loading}
	//                   >
	//                     Confirm
	//                   </button>
	//                 ) : (
	//                   <button
	//                     className="button alternate-button button-lg mt-5"
	//                     onClick={swapUSDC}
	//                     disabled={loading}
	//                   >
	//                     Confirm
	//                   </button>
	//                 )}
	//               </div>
	//             </>
	//           )}
	//           {purchaseStep === 1 && purchaseSelection === "rocks via card" && (
	//             <>
	//               <iframe
	//                 allow="accelerometer; autoplay; camera; gyroscope; payment"
	//                 frameborder="0"
	//                 height="700px"
	//                 src={link !== "" ? link : ""}
	//                 width="100%"
	//               >
	//                 <p>Your browser does not support iframes.</p>
	//               </iframe>
	//               <div className="d-flex justify-content-end">
	//                 <Button
	//                   onClick={() => handleSelection(1, "rocks via crypto")}
	//                 >
	//                   <BsArrowRight />
	//                 </Button>
	//               </div>
	//             </>
	//           )}
	//           {purchaseStep === 1 && purchaseSelection === "rocks via crypto" && (
	//             <>
	//               <p className="large-para fw-bold text-center pb-4">
	//                 Swap BNB to USDC
	//               </p>
	//               <div className="white-box compress-y py-5">
	//                 <div className="center-xy">
	//                   <div className="w-100">
	//                     <div className="flex-input-group">
	//                       <input
	//                         type="text"
	//                         onChange={getamount3}
	//                         value={estimate3}
	//                         className="simple-input"
	//                         placeholder="min value 1"
	//                         disabled={loading}
	//                       />
	//                       <div className="flex-wrap-items shrink-small">
	//                         <button className="blue" onClick={balance3}>
	//                           Max
	//                         </button>
	//                         <img
	//                           src="assets/images/bnb_icon.svg"
	//                           alt=""
	//                           className="small-icon"
	//                         />
	//                         <p className="para">BNB</p>
	//                       </div>
	//                     </div>
	//                   </div>
	//                   <BsArrowDown className="icon p-2 m-2 muted" />

	//                   <div className="flex-input-group">
	//                     <input
	//                       type="text"
	//                       value={value3}
	//                       className="simple-input"
	//                       placeholder="USDC"
	//                       disabled={loading}
	//                     />
	//                     <div className="flex-wrap-items shrink-small">
	//                       <img
	//                         src="assets/images/usdc.png"
	//                         alt=""
	//                         className="small-icon"
	//                       />
	//                       <p className="normal-para">USDC</p>
	//                     </div>
	//                   </div>
	//                 </div>
	//               </div>
	//               <div className="center-x">
	//                 <button
	//                   className="button alternate-button button-lg mt-5"
	//                   onClick={swapUSDC}
	//                   disabled={loading}
	//                 >
	//                   Confirm
	//                 </button>
	//               </div>
	//               <div className="d-flex justify-content-end">
	//                 <Button onClick={() => handleSelection(1, "rocks via usdc")}>
	//                   <BsArrowRight />
	//                 </Button>
	//               </div>
	//             </>
	//           )}
	//           {purchaseStep === 1 && purchaseSelection === "rocks via usdc" && (
	//             <>
	//               <p className="large-para fw-bold text-center pb-4">
	//                 Buy ROCKS via USDC
	//               </p>
	//               <div className="white-box compress-y py-5">
	//                 <div className="center-xy">
	//                   <div className="w-100">
	//                     <div className="flex-input-group">
	//                       <input
	//                         type="number"
	//                         step="1"
	//                         onChange={(e) => setQuantity(e.target.value)}
	//                         value={quantity}
	//                         className="simple-input"
	//                         placeholder="Quantity"
	//                         disabled={loading}
	//                       />
	//                     </div>
	//                   </div>
	//                 </div>
	//               </div>
	//               <div className="center-x">
	//                 <button
	//                   className="button alternate-button button-lg mt-5"
	//                   onClick={buyRock}
	//                   disabled={loading}
	//                 >
	//                   Buy
	//                 </button>
	//               </div>
	//             </>
	//           )}
	//         </Modal.Body>
	//       </Modal>
	//     </div>
	//   </>
	// );
};
