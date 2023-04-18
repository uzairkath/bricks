import * as React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
// import { Col, Container, Row } from "react-bootstrap";
// import { DashboardItem } from "../components";
// import { RiSendPlane2Fill } from "react-icons/ri";
// import { FiCopy } from "react-icons/fi";
// import { ReferralContext } from "../context/Referral";
// import useLocalStorage from "../hooks/useLocalStorage.js";
// // import apis from "../services/index.js";
// import { SIGNUP_URL } from "@assets/constants";

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { ReferralItem, ShareRefferal } from '@components/Referral';
import DownIcon from '@assets/images/down_icon.svg';
import AmountIcon from '@assets/images/amount_icon.svg';
import meetingImg from '@assets/images/meeting_img.svg';

const MeetingImage = styled.img<{ bigIcon?: boolean }>((props) =>
	css({
		width: '80%',
	})
);

export const Referral = () => {
	// const [user] = useLocalStorage("user", null);
	// const [referralId, setReferralId] = React.useState("");
	// const [email, setEmail] = React.useState("");
	// const [numberOfRefree, setNoOfRefree] = React.useState(0);
	// const [rockSold, setRockSold] = React.useState(0);
	// const [LPEarned, setLPEarned] = React.useState(0);
	// const [refrees, setRefrees] = React.useState();
	// const { loading, currentAccount } = React.useContext(ReferralContext);
	// const invite = async (e) => {
	//   e.preventDefault();
	//   try {
	//     if (user && currentAccount) {
	//       const body = {
	//         to: email,
	//         invitation: referralId,
	//       };
	//       const response = await apis.sendInvite(body);
	//       alert("Email sent successfully");
	//       setEmail("");
	//     }
	//   } catch (err) {
	//     console.log("error", err);
	//   }
	// };
	// React.useEffect(() => {
	//   (async () => {
	//     try {
	//       if (user && currentAccount) {
	//         const body = {
	//           address: currentAccount,
	//         };
	//         const response = await apis.setReferralData(body);
	//         console.log("Done", response);
	//       }
	//     } catch (err) {
	//       console.log("Errror", err);
	//     }
	//   })();
	// }, [currentAccount]);
	// React.useEffect(() => {
	//   (async () => {
	//     try {
	//       if (user && currentAccount) {
	//         const response = await apis.getReferralData();
	//         setReferralId(response.data.data);
	//         console.log("#####", response.data.data);
	//       }
	//     } catch (e) {
	//       console.log("Error in Referral", e);
	//     }
	//   })();
	// }, [currentAccount]);
	// React.useEffect(() => {
	//   (async () => {
	//     try {
	//       const response = await apis.getNoOfRefree();
	//       console.log(response.data.data);
	//       if (response.data.data == null) {
	//         setNoOfRefree(0);
	//       } else {
	//         setNoOfRefree(response.data.data);
	//       }
	//     } catch (err) {
	//       console.log("Errror", err);
	//     }
	//   })();
	//   (async () => {
	//     try {
	//       const response = await apis.allRefrees();
	//       console.log("====", response.data);
	//       setRefrees(response.data);
	//     } catch (err) {
	//       console.log("Errror", err);
	//     }
	//   })();
	//   (async () => {
	//     try {
	//       const response = await apis.getRockSold();
	//       console.log("====", response.data);
	//       if (response.data == null) {
	//         setRockSold(0);
	//       } else {
	//         setRockSold(response.data);
	//       }
	//     } catch (err) {
	//       console.log("Errror", err);
	//     }
	//   })();
	//   (async () => {
	//     try {
	//       const response = await apis.getLPsEarned();
	//       console.log("====", response.data);
	//       if (response.data == null) {
	//         setLPEarned(0);
	//       } else {
	//         setLPEarned(response.data);
	//       }
	//     } catch (err) {
	//       console.log("Errror", err);
	//     }
	//   })();
	// }, []);
	// function copyLink() {
	//   const text = SIGNUP_URL + referralId;
	//   navigator.clipboard.writeText(text);
	//   console.log(text);
	// }
	// function openReferralLink() {
	//   const text = SIGNUP_URL + referralId;
	//   window.open(text, "_self");
	// }
	// console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWW", refrees);

	// return (
	//   <>
	//     <div className="page-styles referrals-page">
	//       <Container>
	//         <div className="main-items pb-3">
	//           <Row>
	//             {referralItems.map((item) => {
	//               return (
	//                 <>
	//                   <Col sm={6} md={4} lg={3}>
	//                     <DashboardItem bgIcon data={item} />
	//                   </Col>
	//                 </>
	//               );
	//             })}
	//           </Row>
	//         </div>
	//         <Row className="reverse-column-sm">
	//           <Col md={6}>
	//             <p className="section-title">Referrals</p>
	//             <p className="large-para muted-dark w-75">
	//               Invite your friends to MyBricks 2.0 and earn $50 per NFT they
	//               purchase.{" "}
	//               <a href="#" className="underline">
	//                 Click here
	//               </a>{" "}
	//               to know more!
	//             </p>
	//             <form action="" className="pt-5" onSubmit={invite}>
	//               <label htmlFor="label" className="normal-para muted-dark pb-2">
	//                 Spread the word and send your friends invitations to join
	//                 MyBricks 2.0
	//               </label>
	//               <div className="custom-input-group">
	//                 <input
	//                   name="email"
	//                   type="email"
	//                   value={email}
	//                   placeholder="Email Address"
	//                   className="custom-input"
	//                   onChange={(e) => setEmail(e.target.value)}
	//                 />
	//                 <button className="custom-input-button middle-img">
	//                   <RiSendPlane2Fill />
	//                 </button>
	//               </div>
	//               <p className="large-para pt-5">Share the referral link</p>
	//               <p className="normal-para muted-dark">
	//                 You can also share your referral link by copying and sending
	//                 it or sharing it on your social media.
	//               </p>
	//             </form>
	//             <div className="flex-wrap-items shrink mt-2">
	//               <div className="position-relative">
	//                 <input
	//                   id="referralId"
	//                   value={referralId}
	//                   type="text"
	//                   disabled
	//                   placeholder="Referral Id"
	//                   className="custom-input address-input input-radius d-flex justify-content-end align-items-center large-para"
	//                 />
	//                 <button
	//                   className="justify-content-end align-items-center large-para copy-icon"
	//                   onClick={copyLink}
	//                   disabled={loading}
	//                 >
	//                   <FiCopy />
	//                 </button>
	//               </div>
	//               <img
	//                 src="assets/images/link.svg"
	//                 alt=""
	//                 className="small-icon"
	//                 role="button"
	//                 onClick={openReferralLink}
	//               />
	//               <img
	//                 src="assets/images/facebook_icon.svg"
	//                 alt=""
	//                 className="small-icon"
	//               />
	//               <img
	//                 src="assets/images/twitter_icon.svg"
	//                 alt=""
	//                 className="small-icon"
	//               />
	//               <img
	//                 src="assets/images/linkedin_icon.svg"
	//                 alt=""
	//                 className="small-icon"
	//               />
	//             </div>
	//             <p className="large-para pt-5">Referral Users</p>
	//           </Col>
	//           <Col md={6}>
	//             <div className="middle-img">
	//               <img
	//                 src="assets/images/meeting_img.svg"
	//                 className="w-75"
	//                 alt=""
	//               />
	//             </div>
	//           </Col>
	//         </Row>
	//         <div className="scroll-x">
	//           <div className="custom-table">
	//             <table>
	//               <thead>
	//                 <tr>
	//                   <th className="normal-para">User</th>
	//                   <th className="normal-para">Referral Link</th>
	//                   <th className="normal-para">Date</th>
	//                 </tr>
	//               </thead>
	//               <tbody>
	//                 {refrees?.map((el, i) => (
	//                   <tr>
	//                     <td className="normal-para muted-dark">{el.name}</td>
	//                     <td className="normal-para muted-dark">
	//                       https://localhost:4500/
	//                       {`${el.link.slice(0, 34)}${el.link.slice(
	//                         el.link.length - 30
	//                       )}`}
	//                     </td>
	//                     <td className="normal-para muted-dark">{el.time}</td>
	//                   </tr>
	//                 ))}
	//               </tbody>
	//             </table>
	//           </div>
	//         </div>
	//       </Container>
	//     </div>
	//   </>
	// );

	const [numberOfRefree, setNumberOfRefree] = React.useState<number>(0);
	const [LPEarned, setLPEarned] = React.useState<number>(0);
	const [rockSold, setRockSold] = React.useState<number>(0);

	const referralItems = React.useMemo(
		() => [
			{
				icon: DownIcon,
				value: numberOfRefree,
				label: 'Referee',
			},
			{
				icon: AmountIcon,
				value: LPEarned,
				label: 'LP Tokens Earned',
			},
			{
				icon: AmountIcon,
				value: rockSold,
				label: 'Total ROCKS sold',
			},
		],
		[numberOfRefree, LPEarned, rockSold]
	);
	return (
		<Box
			sx={{
				py: 10,
				minHeight: '100%',
				background: 'var(--light-gradient)',
			}}
		>
			<Container>
				<Grid container spacing={2}>
					{referralItems.map((referralItem, index) => (
						<Grid item key={index} xs={12} md={4} lg>
							<ReferralItem {...referralItem} />
						</Grid>
					))}
				</Grid>

				<Grid container spacing={2} mt={5}>
					<Grid
						item
						xs={12}
						lg={6}
						display="flex"
						alignItems="center"
						justifyContent="center"
					>
						<ShareRefferal />
					</Grid>
					<Grid
						item
						xs={12}
						lg={6}
						display="flex"
						alignItems="center"
						justifyContent="center"
					>
						<MeetingImage src={meetingImg} />
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};
