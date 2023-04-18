import { Box, Button, Typography } from '@mui/material';
import * as React from 'react';
import { DashboardItem, DashboardItemProps } from '../DashboardItem';
// import { ReferralContext } from '../../context/Referral';
// import DashboardItem from './DashboardItem';
// import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
// import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
// import useLocalStorage from '../../hooks/useLocalStorage';
// import apis from '../../services';
// import { useNavigate } from 'react-router-dom';
// import { BsArrowDown, BsArrowRight } from 'react-icons/bs';

export type DashboardCardProps = {
	header: DashboardItemProps;
	entries: Array<{ label: string; value: number | string }>;
	desc: string;
	buttonContent: React.ReactNode;
	handleClick: () => void;
};

export const DashboardCard: React.FC<DashboardCardProps> = ({
	header,
	entries,
	desc,
	buttonContent,
	handleClick,
}) => {
	// const [user] = useLocalStorage("user", null);
	// const [user] = useLocalStorage('user', null);
	// const {
	// 	buyRock,
	// 	buyBond,
	// 	setQuantity,
	// 	quantity,
	// 	swapUSDCTokens,
	// 	loading,
	// 	swapUSDCToMyUSDTokens,
	// 	checkAmount4,
	// 	getBalance4,
	// 	currentAccount,
	// 	checkAmount3,
	// 	getBalance3,
	// } = useContext(ReferralContext);
	// const [purchaseShow, setPurchaseShow] = useState(false);
	// const [purchaseShow2, setPurchaseShow2] = useState(false);
	// const [purchaseStep, setPurchaseStep] = useState(0);
	// const [purchaseStep2, setPurchaseStep2] = useState(0);
	// const [purchaseSelection, setPurchaseSelection] = useState('');
	// const [purchaseSelection2, setPurchaseSelection2] = useState('');
	// const [link, setLink] = useState('');
	// const [value2, setValue2] = useState(0);
	// const [amount2, setAmount2] = useState(0);
	// const [estimate2, setEstimate2] = useState('');
	// const [value3, setValue3] = useState(0);
	// const [amount3, setAmount3] = useState(0);
	// const [estimate3, setEstimate3] = useState('');
	// const navigate = useNavigate();
	// const handlePurchaseShow = () => {
	// 	setPurchaseShow(true);
	// };
	// const handlePurchaseShow2 = () => {
	// 	setPurchaseShow2(true);
	// };
	// const handlePurchaseHide = () => {
	// 	setPurchaseShow(false);
	// 	setPurchaseStep(0);
	// 	setAmount2('');
	// 	setEstimate2('');
	// 	setValue2('');
	// };
	// const handlePurchaseHide2 = () => {
	// 	setPurchaseShow2(false);
	// 	setPurchaseStep2(0);
	// };
	// const handleSelection = (step, choice) => {
	// 	setPurchaseStep(step);
	// 	setPurchaseSelection(choice);
	// };
	// const handleSelection2 = (step, choice) => {
	// 	setPurchaseStep2(step);
	// 	setPurchaseSelection2(choice);
	// };
	// const getamount2 = async (e) => {
	// 	setEstimate2(e.target.value);
	// 	setValue2('');
	// 	setAmount2(e.target.value);
	// 	const res = await checkAmount4(e.target.value);
	// 	console.log('++++', res);
	// 	setValue2(res);
	// };
	// const balance2 = async () => {
	// 	const res1 = await getBalance4();
	// 	console.log('This', res1);
	// 	setEstimate2(res1);
	// 	setAmount2(res1);
	// 	const res = await checkAmount4(res1);
	// 	setValue2(res);
	// };
	// const swapMyUSD = async () => {
	// 	await swapUSDCToMyUSDTokens(amount2);
	// 	setValue2('');
	// 	setAmount2('');
	// 	setEstimate2('');
	// 	navigate('/portfolio');
	// 	console.log('Hello MyUSD');
	// };
	// const swapUSDC = async () => {
	// 	const res = await swapUSDCTokens(amount3);
	// 	if (res == true) {
	// 		setValue3('');
	// 		setAmount3('');
	// 		setEstimate3('');
	// 		handleSelection2(1, 'rocks via usdc');
	// 	}
	// 	console.log('Hello USDC');
	// };
	// const balance3 = async () => {
	// 	const res1 = await getBalance3();
	// 	setEstimate3(res1);
	// 	setAmount3(res1);
	// 	const res = await checkAmount3(res1);
	// 	setValue3(res);
	// };
	// const moon = async () => {
	// 	handleSelection2(1, 'rocks via card');
	// 	try {
	// 		const body = {
	// 			email: user?.email,
	// 			walletAddress: currentAccount,
	// 		};
	// 		const response = await apis.getBNBTransaction(body);
	// 		setLink(response.data.data);
	// 		console.log('Done', response.data.data);
	// 	} catch (err) {
	// 		console.log('Error', err);
	// 	}
	// };
	// const getamount3 = async (e) => {
	// 	setEstimate3(e.target.value);
	// 	setValue3('');
	// 	setAmount3(e.target.value);
	// 	const res = await checkAmount3(e.target.value);
	// 	setValue3();
	// };
	// const {
	// 	buttonText = '',
	// 	header = {},
	// 	desc = '',
	// 	entries = [],
	// 	disabledButton,
	// } = data || {};

	return (
		<Box
			sx={{
				borderRadius: 'var(--border-radius)',
				overflow: 'hidden',
			}}
		>
			<DashboardItem {...header} bigIcon sx={{ backgroundColor: '#fff' }} />
			<Box
				sx={{
					backgroundColor: '#3f3d560d',
					p: 2,
				}}
			>
				<Typography sx={{ my: 2, fontWeight: 500, fontSize: '1rem' }}>
					{desc}
				</Typography>
				{entries.map((entry, index) => (
					<Box
						display="flex"
						justifyContent="space-between"
						key={index}
						sx={{ my: 2 }}
					>
						<Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>
							{entry.label}:
						</Typography>
						<Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>
							{entry.value}
						</Typography>
					</Box>
				))}
				<Button variant="contained" fullWidth>
					{buttonContent}
				</Button>
			</Box>
		</Box>
	);
	// return (
	// 	<>
	// 		<article className="db-card">
	// 			<div className="db-card-b">
	// 				<p className="normal-para muted">{desc}</p>
	//
	// 				{/* {inputField && (
	//           <div className="d-flex pt-2 p-md-3">
	//             <input
	//               value={quantity}
	//               placeholder="Quantity"
	//               type="number"
	//               step="1"
	//               min="1"
	//               className="ms-auto custom-input"
	//               onChange={(e) => setQuantity(e.target.value)}
	//               disabled={loading}
	//             />
	//           </div>
	//         )} */}
	// 				<div className="center-x pt-4">
	// 					<button
	// 						className={`button ${disabledButton && 'disabled'}`}
	// 						onClick={
	// 							handleClick == 0
	// 								? handlePurchaseShow
	// 								: handleClick == 1
	// 								? handlePurchaseShow2
	// 								: handleClick == 2
	// 								? buyBond
	// 								: ''
	// 						}
	// 						//  disabled={handleClick == 1 && (quantity == 0 || loading)}
	// 					>
	// 						{buttonText}
	// 					</button>
	// 				</div>
	// 			</div>
	// 		</article>
	// 		{/* MyUSD */}
	// 		<Modal
	// 			className="custom-modal"
	// 			show={purchaseShow}
	// 			onHide={handlePurchaseHide}
	// 			centered
	// 		>
	// 			<Modal.Header closeButton>
	// 				{purchaseStep ? (
	// 					<>
	// 						<button
	// 							onClick={() => {
	// 								setPurchaseStep((prev) => prev - 1);
	// 							}}
	// 						>
	// 							<FiArrowLeft />
	// 						</button>
	// 					</>
	// 				) : (
	// 					<></>
	// 				)}
	// 			</Modal.Header>
	// 			<Modal.Body className="pb-5 p-4">
	// 				{!purchaseStep && (
	// 					<>
	// 						<p className="large-para fw-bold text-center pb-4">
	// 							Purchase Options
	// 						</p>
	// 						<div
	// 							className="white-box compress-y py-5"
	// 							onClick={() => {
	// 								handleSelection(1, 'usdc to myUSD');
	// 							}}
	// 						>
	// 							<p className="para muted-dark text-center pb-4 dark fw-bold">
	// 								Swap USDC to MyUSD
	// 							</p>
	// 							<div className="joint-list-x">
	// 								<article className="option-box">
	// 									<img
	// 										src="assets/images/usdc.png"
	// 										alt=""
	// 										style={{ height: '50px' }}
	// 										className="option-icon"
	// 									/>
	// 									<p className="sub-title fw-semibold">USDC</p>
	// 								</article>
	// 								<article className="option-box shadowless">
	// 									<FiArrowRight />
	// 									<p className="sub-title fw-semibold">to</p>
	// 								</article>
	// 								<article className="option-box">
	// 									<img
	// 										src="assets/images/usd_badge.svg"
	// 										alt=""
	// 										className="option-icon"
	// 									/>
	// 									<p className="sub-title fw-semibold">MyUSD</p>
	// 								</article>
	// 							</div>
	// 						</div>
	// 					</>
	// 				)}
	// 				{purchaseStep === 1 && purchaseSelection === 'usdc to myUSD' && (
	// 					<>
	// 						<p className="large-para fw-bold text-center pb-4">
	// 							Swap USDC to MyUSD
	// 						</p>
	// 						<div className="white-box compress-y py-5">
	// 							<div className="center-xy">
	// 								<div className="w-100">
	// 									<div className="flex-input-group">
	// 										<input
	// 											type="text"
	// 											onChange={getamount2}
	// 											value={estimate2}
	// 											className="simple-input"
	// 											placeholder="min value 0.05"
	// 											disabled={loading}
	// 										/>
	// 										<div className="flex-wrap-items shrink-small">
	// 											<button className="blue" onClick={balance2}>
	// 												Max
	// 											</button>
	// 											<img
	// 												src="assets/images/usdc.png"
	// 												alt=""
	// 												className="small-icon"
	// 											/>
	// 											<p className="para">USDC</p>
	// 										</div>
	// 									</div>
	// 								</div>
	// 								<BsArrowDown className="icon p-2 m-2 muted" />
	// 								<div className="flex-input-group">
	// 									<input
	// 										type="text"
	// 										className="simple-input"
	// 										value={value2}
	// 										placeholder="MyUSD"
	// 										disabled={loading}
	// 									/>
	// 									<div className="flex-wrap-items shrink-small">
	// 										<img
	// 											src="assets/images/usd_badge.svg"
	// 											alt=""
	// 											className="small-icon"
	// 										/>
	// 										<p className="normal-para">MYUSD</p>
	// 									</div>
	// 								</div>
	// 							</div>
	// 						</div>
	// 						<div className="center-x">
	// 							<button
	// 								className="button alternate-button button-lg mt-5"
	// 								onClick={swapMyUSD}
	// 								disabled={loading}
	// 							>
	// 								Confirm
	// 							</button>
	// 						</div>
	// 					</>
	// 				)}
	// 				{purchaseStep === 1 && purchaseSelection === 'bricks via card' && (
	// 					<>
	// 						<iframe
	// 							allow="accelerometer; autoplay; camera; gyroscope; payment"
	// 							frameBorder="0"
	// 							height="700px"
	// 							src={link !== '' ? link : ''}
	// 							width="100%"
	// 						>
	// 							<p>Your browser does not support iframes.</p>
	// 						</iframe>
	// 					</>
	// 				)}
	// 			</Modal.Body>
	// 		</Modal>
	// 		{/* ROCKS */}
	// 		<Modal
	// 			className="custom-modal"
	// 			show={purchaseShow2}
	// 			onHide={handlePurchaseHide2}
	// 			centered
	// 		>
	// 			<Modal.Header closeButton>
	// 				{purchaseStep ? (
	// 					<>
	// 						<button
	// 							onClick={() => {
	// 								setPurchaseStep2((prev) => prev - 1);
	// 							}}
	// 						>
	// 							<FiArrowLeft />
	// 						</button>
	// 					</>
	// 				) : (
	// 					<></>
	// 				)}
	// 			</Modal.Header>
	// 			<Modal.Body className="pb-5 p-4">
	// 				{!purchaseStep2 && (
	// 					<>
	// 						<p className="large-para fw-bold text-center pb-4">
	// 							Purchase Options
	// 						</p>
	// 						<div className="white-box compress-y py-5 mb-5" onClick={moon}>
	// 							<p className="para muted-dark text-center pb-4 dark fw-bold">
	// 								Buy ROCKS via card or bank transfer <br /> service provided by
	// 								&nbsp;
	// 								<span className="blue-link">Moonpay</span>
	// 							</p>
	// 							<div className="joint-list-x">
	// 								<article className="option-box">
	// 									<img
	// 										src="assets/images/cash.png"
	// 										alt=""
	// 										style={{ height: '40px', width: '50px' }}
	// 										className="option-icon"
	// 									/>
	// 									<p className="sub-title fw-semibold">Fiat</p>
	// 								</article>
	// 								<article className="option-box shadowless">
	// 									<FiArrowRight />
	// 									<p className="sub-title fw-semibold">to</p>
	// 								</article>
	// 								<article className="option-box">
	// 									<img
	// 										src="assets/images/my_rocks_icon.svg"
	// 										alt=""
	// 										style={{ height: '50px' }}
	// 										className="option-icon"
	// 									/>
	// 									<p className="sub-title fw-semibold">ROCKS</p>
	// 								</article>
	// 							</div>
	// 						</div>
	// 						<div
	// 							className="white-box compress-y py-5"
	// 							onClick={() => {
	// 								handleSelection2(1, 'rocks via crypto');
	// 							}}
	// 						>
	// 							<p className="para muted-dark text-center pb-4 dark fw-bold">
	// 								Swap BNB to USDC
	// 							</p>
	// 							<div className="joint-list-x">
	// 								<article className="option-box">
	// 									<img
	// 										src="assets/images/bnb_icon.svg"
	// 										alt=""
	// 										style={{ height: '50px' }}
	// 										className="option-icon"
	// 									/>
	// 									<p className="sub-title fw-semibold">BNB</p>
	// 								</article>
	// 								<article className="option-box shadowless">
	// 									<FiArrowRight />
	// 									<p className="sub-title fw-semibold">to</p>
	// 								</article>
	// 								<article className="option-box">
	// 									<img
	// 										src="assets/images/my_rocks_icon.svg"
	// 										alt=""
	// 										style={{ height: '50px' }}
	// 										className="option-icon"
	// 									/>
	// 									<p className="sub-title fw-semibold">ROCKS</p>
	// 								</article>
	// 							</div>
	// 						</div>
	// 					</>
	// 				)}
	// 				{purchaseStep2 === 1 && purchaseSelection2 === 'rocks via card' && (
	// 					<>
	// 						<iframe
	// 							allow="accelerometer; autoplay; camera; gyroscope; payment"
	// 							frameBorder="0"
	// 							height="700px"
	// 							src={link !== '' ? link : ''}
	// 							width="100%"
	// 						>
	// 							<p>Your browser does not support iframes.</p>
	// 						</iframe>
	// 						<div className="d-flex justify-content-end">
	// 							<Button onClick={() => handleSelection2(1, 'rocks via crypto')}>
	// 								<BsArrowRight />
	// 							</Button>
	// 						</div>
	// 					</>
	// 				)}
	// 				{purchaseStep2 === 1 && purchaseSelection2 === 'rocks via crypto' && (
	// 					<>
	// 						<p className="large-para fw-bold text-center pb-4">
	// 							Swap BNB to USDC
	// 						</p>
	// 						<div className="white-box compress-y py-5">
	// 							<div className="center-xy">
	// 								<div className="w-100">
	// 									<div className="flex-input-group">
	// 										<input
	// 											type="text"
	// 											onChange={getamount3}
	// 											value={estimate3}
	// 											className="simple-input"
	// 											placeholder="min value 1"
	// 											disabled={loading}
	// 										/>
	// 										<div className="flex-wrap-items shrink-small">
	// 											<button className="blue" onClick={balance3}>
	// 												Max
	// 											</button>
	// 											<img
	// 												src="assets/images/bnb_icon.svg"
	// 												alt=""
	// 												className="small-icon"
	// 											/>
	// 											<p className="para">BNB</p>
	// 										</div>
	// 									</div>
	// 								</div>
	// 								<BsArrowDown className="icon p-2 m-2 muted" />
	// 								<div className="flex-input-group">
	// 									<input
	// 										type="text"
	// 										value={value3}
	// 										className="simple-input"
	// 										placeholder="USDC"
	// 										disabled={loading}
	// 									/>
	// 									<div className="flex-wrap-items shrink-small">
	// 										<img
	// 											src="assets/images/usdc.png"
	// 											alt=""
	// 											className="small-icon"
	// 										/>
	// 										<p className="normal-para">USDC</p>
	// 									</div>
	// 								</div>
	// 							</div>
	// 						</div>
	// 						<div className="center-x">
	// 							<button
	// 								className="button alternate-button button-lg mt-5"
	// 								onClick={swapUSDC}
	// 								disabled={loading}
	// 							>
	// 								Confirm
	// 							</button>
	// 						</div>
	// 						<div className="d-flex justify-content-end">
	// 							<Button onClick={() => handleSelection2(1, 'rocks via usdc')}>
	// 								<BsArrowRight />
	// 							</Button>
	// 						</div>
	// 					</>
	// 				)}
	// 				{purchaseStep2 === 1 && purchaseSelection2 === 'rocks via usdc' && (
	// 					<>
	// 						<p className="large-para fw-bold text-center pb-4">
	// 							Buy ROCKS via USDC
	// 						</p>
	// 						<div className="white-box compress-y py-5">
	// 							<div className="center-xy">
	// 								<div className="w-100">
	// 									<div className="flex-input-group">
	// 										<input
	// 											type="number"
	// 											step="1"
	// 											onChange={(e) => setQuantity(e.target.value)}
	// 											value={quantity}
	// 											className="simple-input"
	// 											placeholder="Quantity"
	// 											disabled={loading}
	// 										/>
	// 									</div>
	// 								</div>
	// 							</div>
	// 						</div>
	// 						<div className="center-x">
	// 							<button
	// 								className="button alternate-button button-lg mt-5"
	// 								onClick={buyRock}
	// 								disabled={loading}
	// 							>
	// 								Buy
	// 							</button>
	// 						</div>
	// 					</>
	// 				)}
	// 			</Modal.Body>
	// 		</Modal>
	// 	</>
	// );
};
