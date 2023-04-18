import * as React from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import './App.css';
import { AnimationLayout, Header, Sidebar } from '@components/common';
import {
	Referral,
	Boardroom,
	NFTMint,
	Dashboard,
	Farm,
	Bond,
	Wallet,
} from 'pages';
import { useCollapse } from '@providers/CollapseProvider';
// import useLocalStorage from "./hooks/useLocalStorage";
// import {
//   Boardroom,
//   Dashboard,
//   Farm,
//   Login,
//   NFTMint,
//   NFTPage,
//   Referral,
//   WalletPage,
// } from "./pages";
// import BuyRedeem from "./pages/BuyRedeem";

const App: React.FC = () => {
	const { collapsed, width, overflowed } = useCollapse();
	const [contentBox, setContentBox] = React.useState<HTMLDivElement>();
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: contentBox,
	});
	const contentProperty = React.useMemo(
		() => ({
			ml: collapsed
				? overflowed
					? [`${width.smallOverflowed}px`, `${width.mediumOverflowed}px`]
					: [`${width.small}px`, `${width.medium}px`]
				: overflowed
				? [`${width.smallOverflowed}px`, `${width.large}px`]
				: [`${width.small}px`, `${width.large}px`],
			width: collapsed
				? overflowed
					? [
							`calc(100% - ${width.smallOverflowed}px)`,
							`calc(100% - ${width.mediumOverflowed}px)`,
					  ]
					: [`calc(100% - ${width.small}px)`, `calc(100% - ${width.medium}px)`]
				: overflowed
				? [
						`calc(100% - ${width.smallOverflowed}px)`,
						`calc(100% - ${width.large}px)`,
				  ]
				: [`calc(100% - ${width.small}px)`, `calc(100% - ${width.large}px)`],
		}),
		[collapsed, width, overflowed]
	);

	return (
		<BrowserRouter>
			<Sidebar />
			<Box
				sx={{
					position: 'relative',
					marginLeft: contentProperty.ml,
					width: contentProperty.width,
					transition: (theme) =>
						theme.transitions.create(['margin-left', 'width'], {
							easing: theme.transitions.easing.sharp,
							duration: collapsed
								? theme.transitions.duration.enteringScreen
								: theme.transitions.duration.leavingScreen,
						}),
					height: '100%',
					overflow: 'hidden',
				}}
			>
				<Header scrolled={trigger} />
				<Routes>
					<Route
						element={
							<AnimationLayout
								ref={(node: HTMLDivElement | null) => {
									if (node) setContentBox(node);
								}}
							/>
						}
					>
						<Route
							path="/"
							element={<Navigate to="/referral" replace={true} />}
						/>
						<Route path="/boardroom" element={<Boardroom />} />
						<Route path="/bond" element={<Bond />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/farm" element={<Farm />} />
						<Route path="/nft-mint" element={<NFTMint />} />
						<Route path="/referral" element={<Referral />} />
						<Route path="/portfolio" element={<Wallet />} />
					</Route>
				</Routes>
			</Box>
		</BrowserRouter>
	);
};

export default App;
