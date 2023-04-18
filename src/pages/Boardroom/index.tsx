import * as React from 'react';
import { bsc } from 'wagmi/chains';
import {
	Box,
	CircularProgress,
	Container,
	Grid,
	Typography,
} from '@mui/material';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { useBoardroom } from 'generated';

import {
	LargeCard,
	Regulation,
	OwnedNFTs,
	StakedNFTs,
	ClaimCard,
} from '@components/Boardroom';
import { FarmItem } from '@components/Farm';
import usdBadge from '@assets/images/usd_badge.svg';
import { getDisplayBalance, Swal, Toast } from 'utils';
import { useData } from '@providers/DataProvider';

export const Boardroom: React.FC = () => {
	const { isConnected } = useAccount();
	const { data: signer } = useSigner();
	const [nextEpochTime] = React.useState<string>('Loading...');
	const [currentEpoch, setCurrentEpoch] = React.useState<string>('Loading...');
	const [rocksStaked, setRocksStaked] = React.useState<string>('Loading...');
	const [canClaim, setCanClaim] = React.useState<boolean>(false);
	const [claimLoading, setClaimLoading] = React.useState<boolean>(false);
	const { stakedNFTs, priceUsdc, myUsdTwap, reloadLP } = useData();

	const provider = useProvider({ chainId: bsc.id });

	const boardroomReadContract = useBoardroom({
		chainId: bsc.id,
		signerOrProvider: provider,
	});

	const boardroomContract = useBoardroom({
		chainId: bsc.id,
		signerOrProvider: signer,
	});

	const handleClaimOnly = React.useCallback(async () => {
		if (stakedNFTs.length <= 0) {
			await Swal.fire({
				icon: 'warning',
				title: 'You have no ROCKs in your wallet.',
			});
			return;
		}
		if (isConnected && boardroomContract && boardroomContract.signer) {
			try {
				setClaimLoading(true);
				const tx = await boardroomContract.claimReward();
				await tx.wait();
				Toast.fire({
					icon: 'success',
					title: 'Claimed successfully.',
				});
			} catch (err) {
				console.error(err);
			} finally {
				setClaimLoading(false);
			}
		}
	}, [stakedNFTs, boardroomContract, isConnected]);

	const boardroomItems = React.useMemo(
		() => [
			{
				value: nextEpochTime,
				label: 'Next EPOCH',
				unit: '',
			},
			{
				value: currentEpoch,
				label: 'Current EPOCH',
				unit: '',
			},
			{
				value:
					myUsdTwap === undefined
						? 'Loading...'
						: getDisplayBalance(myUsdTwap, 18, 4),
				label: 'MyUSD PEG (TWAP)',
				unit: myUsdTwap === undefined ? '' : 'USDC',
			},
			{
				value:
					myUsdTwap === undefined
						? 'Loading...'
						: (
								Math.floor(
									getDisplayBalance(myUsdTwap, 18, 4) * priceUsdc * 60 * 10000
								) / 10000
						  ).toString(),
				label: 'APR',
				unit: myUsdTwap === undefined ? '' : '%',
			},
			{
				value: rocksStaked,
				label: 'Rocks Staked',
				unit: '',
			},
		],
		[nextEpochTime, currentEpoch, myUsdTwap, rocksStaked, priceUsdc]
	);

	const loadMyUSDEarned = React.useCallback(async () => {
		// if (boardroomReadContract && boardroomReadContract.provider) {
		// 	try {
		// 		setClaimLoading(true);
		// 		// const _address =
		// 		// 	(await boardroomContract.signer.getAddress()) as `0x${string}`;
		// 		const _blockNum = await boardroomReadContract.provider.getBlockNumber();
		// 		const _eventFilter = boardroomReadContract.filters.RewardAdded(
		// 			'0xc44c4907506405c1494bc3d88142a9a4dc015c30',
		// 			null
		// 		);
		// 		console.log(_blockNum);
		// 		const _events: Array<Event> = [];
		// 		const _blocks = Array.from(
		// 			{ length: 50000 },
		// 			(_, index) => _blockNum - index * 3000
		// 		);
		// 		Promise.all(
		// 			_blocks.map(async (_block) => {
		// 				const _eventsTemp = await boardroomReadContract.queryFilter(
		// 					_eventFilter,
		// 					_block - 2999,
		// 					_block
		// 				);
		// 				console.log(_eventsTemp);
		// 				_events.push(..._eventsTemp);
		// 			})
		// 		);
		// 		// while (_blockNum > 26241856) {
		// 		// 	const _eventsTemp = await boardroomReadContract.queryFilter(
		// 		// 		_eventFilter,
		// 		// 		_blockNum - 2999,
		// 		// 		_blockNum
		// 		// 	);
		// 		// 	_blockNum -= 3000;
		// 		// 	console.log(_eventsTemp);
		// 		// 	_events.push(..._eventsTemp);
		// 		// }
		// 		console.log(_events);
		// 	} catch (err) {
		// 		console.error(err);
		// 	} finally {
		// 		setClaimLoading(false);
		// 	}
		// }
	}, []);

	const boardroomCard = React.useMemo(
		() => ({
			title: 'MyUSD \n Earned',
			icons: [usdBadge],
			primaryButtonContent: claimLoading ? (
				<>
					<CircularProgress size={15} color="inherit" />
					&nbsp; Loading
				</>
			) : (
				'Claim & Reinvest'
			),
			// piramryButtonDisabled:
			// 	!canClaim || claimLoading || stakedNFTs.length <= 0,
			primaryButtonDisabled: false,
			primaryButtonHandler: loadMyUSDEarned,
			secondaryButtonContent: claimLoading ? (
				<>
					<CircularProgress size={15} color="inherit" />
					&nbsp; Loading
				</>
			) : (
				'Claim only'
			),
			secondaryButtonDisabled:
				!canClaim || claimLoading || stakedNFTs.length <= 0,
			secondaryButtonHandler: handleClaimOnly,
			valueLeft: 0.0,
			valueRight: 0.0,
		}),
		[handleClaimOnly, canClaim, claimLoading, stakedNFTs, loadMyUSDEarned]
	);

	const refetchValue = React.useCallback(() => {
		reloadLP();
		if (boardroomReadContract && boardroomReadContract.provider) {
			boardroomReadContract.epoch().then((res) => {
				setCurrentEpoch(res.toString());
			});
			boardroomReadContract.totalSupply().then((res) => {
				setRocksStaked(res.toString());
			});
		}
	}, [reloadLP, boardroomReadContract]);

	const loadCanClaim = React.useCallback(async () => {
		if (isConnected && boardroomContract && boardroomContract.signer) {
			try {
				setClaimLoading(true);
				const _address =
					(await boardroomContract.signer.getAddress()) as `0x${string}`;
				const _canClaim = await boardroomContract.canClaimReward(_address);
				setCanClaim(_canClaim);
			} catch (err) {
				console.error(err);
			} finally {
				setClaimLoading(false);
			}
		}
	}, [boardroomContract, isConnected]);

	React.useEffect(() => {
		refetchValue();
	}, [refetchValue]);

	React.useEffect(() => {
		loadCanClaim();
		// const timer = setInterval(() => {
		// 	// if (!claimLoading) loadCanClaim();
		// 	loadCanClaim();
		// }, 20000);
		// return () => {
		// 	clearInterval(timer);
		// };
	}, [loadCanClaim]);

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
					Boardroom
				</Typography>
				<Typography
					sx={{
						fontWeight: 500,
						fontSize: '1.3rem',
						lineHeight: '1.9rem',
						color: 'var(--main)',
						mb: 5,
					}}
				>
					Earn MyUSD by providing liquidity
				</Typography>
				<Grid container spacing={2} mb={2}>
					{boardroomItems.map((item, index) => (
						<Grid item key={index} xs={12} md={6} lg>
							<FarmItem
								value={item.value}
								unit={item.unit}
								label={item.label}
							/>
						</Grid>
					))}
				</Grid>
				<Regulation />
				<Grid container spacing={2} mb={5}>
					<Grid item xs={12} md={7}>
						<LargeCard />
					</Grid>
					<Grid item xs={12} md={5}>
						<ClaimCard data={boardroomCard} />
					</Grid>
				</Grid>
				<OwnedNFTs />
				<StakedNFTs />
			</Container>
		</Box>
	);
};
