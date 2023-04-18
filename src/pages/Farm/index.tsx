import * as React from 'react';
import {
	Box,
	Button,
	Container,
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	InputBase,
	Paper,
	Typography,
} from '@mui/material';
import { BigNumber } from 'ethers';
import { bsc } from 'wagmi/chains';
import { useAccount, useSigner } from 'wagmi';

import {
	FarmCard,
	FarmCardDataType,
	FarmItem,
	FarmItemProps,
	LiquidityPool,
} from '@components/Farm';
import usdcImg from '@assets/images/usdc.png';
import usdBadge from '@assets/images/usd_badge.svg';
import { useData } from '@providers/DataProvider';
import { getDisplayBalance } from 'utils';
import {
	useMyLp,
	useMyLpAllowance,
	useMyLpBalanceOf,
	useMyUsdRewardpool,
	useMyUsdRewardpoolUserInfo,
} from 'generated';
import { contractAddresses } from 'config';

export const Farm: React.FC = () => {
	const { myLpStat, priceUsdc } = useData();
	const [stakeOpen, setStakeOpen] = React.useState<boolean>(false);
	const [unstakeOpen, setUnstakeOpen] = React.useState<boolean>(false);
	const [amount, setAmount] = React.useState<string>('0');
	const { decimals, disabled } = useData();
	const [amountBigNum, setAmountBigNum] = React.useState<BigNumber>(
		BigNumber.from(0)
	);
	const { data: signer } = useSigner();
	const { address } = useAccount();
	const myLpAllowance = useMyLpAllowance({
		chainId: bsc.id,
		args: [
			address || contractAddresses['Zero Address'],
			contractAddresses['MyUSD REWARDPOOL'],
		],
	});
	const myLpContract = useMyLp({ chainId: bsc.id, signerOrProvider: signer });
	const myUsdRewardpoolContract = useMyUsdRewardpool({
		chainId: bsc.id,
		signerOrProvider: signer,
	});
	const myLpBalance = useMyLpBalanceOf({
		chainId: bsc.id,
		args: [address || contractAddresses['Zero Address']],
	});
	const myLpStaked = useMyUsdRewardpoolUserInfo({
		chainId: bsc.id,
		args: [BigNumber.from(0), address || contractAddresses['Zero Address']],
	});

	const farmItems = React.useMemo<Array<FarmItemProps>>(
		() => [
			{
				value: myLpStat
					? myLpStat.myUsdBalance.eq(0)
						? 'Infinity'
						: myLpStat.myUsdPerSecond
								.mul(3600 * 24 * 365 * 1000)
								.div(myLpStat.myUsdBalance)
								.toNumber() / 1000
					: 'Loading...',
				label: 'APR',
				unit: myLpStat ? '%' : '',
			},
			{
				value: myLpStat
					? myLpStat.myUsdBalance.eq(0)
						? 'Infinity'
						: myLpStat.myUsdPerSecond
								.mul(3600 * 24 * 1000)
								.div(myLpStat.myUsdBalance)
								.toNumber() / 1000
					: 'Loading...',
				label: 'DAILY APR',
				unit: myLpStat ? '%' : '',
			},
			{
				value: myLpStat
					? (
							getDisplayBalance(
								myLpStat.reserveUsdc
									.mul(myLpStat.lockedAmount)
									.div(myLpStat.totalSupply)
							) * priceUsdc
					  ).toFixed(3)
					: 'Loading...',
				label: 'TVL',
				unit: myLpStat ? '$' : '',
				unitPosition: 'start',
			},
		],
		[myLpStat, priceUsdc]
	);

	const handleApprove = React.useCallback(async () => {
		if (myLpContract && myLpContract.signer) {
			try {
				const tx = await myLpContract.approve(
					contractAddresses['MyUSD REWARDPOOL'],
					BigNumber.from(2).pow(256).sub(1)
				);
				tx.wait();
			} catch (err) {
				console.log(err);
			}
		}
	}, [myLpContract]);

	const handleStake = React.useCallback(async () => {
		if (myUsdRewardpoolContract && myUsdRewardpoolContract.signer) {
			try {
				const tx = await myUsdRewardpoolContract.deposit(
					BigNumber.from(0),
					amountBigNum
				);
				tx.wait();
			} catch (err) {
				console.log(err);
			} finally {
				setStakeOpen(false);
			}
		}
	}, [myUsdRewardpoolContract, amountBigNum]);

	const handleUnstake = React.useCallback(async () => {
		if (myUsdRewardpoolContract && myUsdRewardpoolContract.signer) {
			try {
				const tx = await myUsdRewardpoolContract.withdraw(
					BigNumber.from(0),
					amountBigNum
				);
				tx.wait();
			} catch (err) {
				console.log(err);
			}
		}
	}, [myUsdRewardpoolContract, amountBigNum]);

	const farmCardData = React.useMemo<Array<FarmCardDataType>>(
		() => [
			{
				title: 'MyUSD-USDC-LP Staked',
				icons: [usdcImg, usdBadge],
				primaryButtonContent: 'Stake',
				primaryButtonDisabled: disabled,
				primaryButtonHandler: () => {
					setAmount('0');
					setAmountBigNum(BigNumber.from(0));
					setStakeOpen(true);
				},
				secondaryButtonContent: 'Claim & Unstake',
				secondaryButtonDisabled: disabled,
				secondaryButtonHandler: () => {
					setAmount('0');
					setAmountBigNum(BigNumber.from(0));
					setUnstakeOpen(true);
				},
				linkContent: (
					<>
						Provide liquidity for
						<br />
						MyUSD-USDC
					</>
				),
				linkHref:
					'https://pancakeswap.finance/add/0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d/0xAD9317601872De47a92A175a94Feb18e72CB5bD5',
				valueLeft: myLpStaked.data
					? getDisplayBalance(myLpStaked.data.amount)
					: 0.0,
				valueRight: 0.0,
			},
			{
				title: 'MyUSD Earned',
				icons: [usdBadge],
				primaryButtonContent: 'Claim & Reinvest',
				primaryButtonDisabled: disabled,
				primaryButtonHandler: async () => {},
				secondaryButtonContent: 'Claim only',
				secondaryButtonDisabled: disabled,
				secondaryButtonHandler: async () => {},
				valueLeft: 0.0,
				valueRight: 0.0,
			},
		],
		[disabled, myLpStaked.data]
	);

	return (
		<Box
			sx={{
				py: 10,
				minHeight: '100%',
				background:
					'linear-gradient(45.16deg, rgb(215, 237, 254) 11.47%, rgb(255, 255, 255) 45.37%, rgb(255, 255, 255) 66.25%, rgb(255, 218, 203) 93.55%)',
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
					Farm
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
				<Grid container spacing={2} mb={6}>
					{farmItems.map((item, index) => (
						<Grid item key={index} xs={12} md={6} lg>
							<FarmItem
								value={item.value}
								unit={item.unit}
								label={item.label}
								unitPosition={item.unitPosition}
							/>
						</Grid>
					))}
				</Grid>
				<Grid container spacing={2} mb={2}>
					<Grid item xs={12} lg={6}>
						<LiquidityPool />
					</Grid>
					{farmCardData.map((cardDatum, index) => (
						<Grid item key={index} xs={12} md={6} lg={3}>
							<FarmCard data={cardDatum} />
						</Grid>
					))}
				</Grid>
			</Container>
			<Dialog
				open={stakeOpen}
				fullWidth
				maxWidth="xs"
				onClose={() => {
					setStakeOpen(false);
				}}
			>
				<DialogTitle>Stake LP Token</DialogTitle>
				<DialogContent>
					<Paper
						sx={{
							display: 'flex',
							alignItems: 'center',
							width: '100%',
							overflow: 'hidden',
							mb: 1,
						}}
					>
						<InputBase
							sx={{ ml: 1, flex: 1, p: '2px 4px' }}
							placeholder="0.00"
							inputProps={{
								'aria-label': 'email address',
								style: { textAlign: 'right' },
							}}
							type="number"
							value={amount.toString()}
							onChange={(e) => {
								const stringValue = e.target.value
									.replace(/^[0]+/, '')
									.replace(/(^$|^\.)/, '0$1')
									.replace(/(\.[0-9]{2})[0-9]*$/, '$1');
								const numberValue = Number(stringValue);
								const bigNumberValue = BigNumber.from(numberValue * 100).mul(
									BigNumber.from(10).pow(decimals['My LP'] - 2)
								);
								if (
									numberValue < 0 ||
									bigNumberValue.gt(myLpBalance.data || BigNumber.from(0))
								)
									return;
								setAmount(stringValue);
								setAmountBigNum(bigNumberValue);
							}}
						/>
						<Button
							sx={{
								p: 1,
								borderRadius: 0,
								minWidth: 0,
							}}
							color="info"
							variant="contained"
							onClick={(e) => {
								e.preventDefault();
								setAmountBigNum(myLpBalance.data || BigNumber.from(0));
								setAmount(
									getDisplayBalance(
										myLpBalance.data || BigNumber.from(0),
										decimals['My LP']
									).toFixed(2)
								);
							}}
						>
							Max{/* <SendIcon /> */}
						</Button>
					</Paper>
					<Typography textAlign="right">
						Your current Balance is{' '}
						{getDisplayBalance(
							myLpBalance.data || BigNumber.from(0),
							decimals['My LP']
						).toFixed(2)}
					</Typography>
					{myLpAllowance.data ? (
						amountBigNum.gt(myLpAllowance.data) ? (
							<Button
								variant="contained"
								color="info"
								fullWidth
								disabled={disabled}
								onClick={handleApprove}
							>
								Approve
							</Button>
						) : (
							<Button
								variant="contained"
								color="info"
								fullWidth
								disabled={disabled}
								onClick={handleStake}
							>
								Stake
							</Button>
						)
					) : (
						<Button variant="contained" color="info" fullWidth disabled>
							Loading...
						</Button>
					)}
				</DialogContent>
			</Dialog>
			<Dialog
				open={unstakeOpen}
				fullWidth
				maxWidth="xs"
				onClose={() => {
					setUnstakeOpen(false);
				}}
			>
				<DialogTitle>Unstake LP Token</DialogTitle>
				<DialogContent>
					<Paper
						sx={{
							display: 'flex',
							alignItems: 'center',
							width: '100%',
							overflow: 'hidden',
							mb: 1,
						}}
					>
						<InputBase
							sx={{ ml: 1, flex: 1, p: '2px 4px' }}
							placeholder="0.00"
							inputProps={{
								'aria-label': 'email address',
								style: { textAlign: 'right' },
							}}
							type="number"
							value={amount.toString()}
							onChange={(e) => {
								const stringValue = e.target.value
									.replace(/^[0]+/, '')
									.replace(/(^$|^\.)/, '0$1')
									.replace(/(\.[0-9]{2})[0-9]*$/, '$1');
								const numberValue = Number(stringValue);
								const bigNumberValue = BigNumber.from(numberValue * 100).mul(
									BigNumber.from(10).pow(decimals['My LP'] - 2)
								);
								if (
									numberValue < 0 ||
									bigNumberValue.gt(
										myLpStaked.data?.amount || BigNumber.from(0)
									)
								)
									return;
								setAmount(stringValue);
								setAmountBigNum(bigNumberValue);
							}}
						/>
						<Button
							sx={{
								p: 1,
								borderRadius: 0,
								minWidth: 0,
							}}
							color="info"
							variant="contained"
							onClick={(e) => {
								e.preventDefault();
								setAmountBigNum(myLpStaked.data?.amount || BigNumber.from(0));
								setAmount(
									getDisplayBalance(
										myLpStaked.data?.amount || BigNumber.from(0),
										decimals['My LP']
									).toFixed(2)
								);
							}}
						>
							Max{/* <SendIcon /> */}
						</Button>
					</Paper>
					<Typography textAlign="right">
						Your staked amount is{' '}
						{getDisplayBalance(
							myLpStaked.data?.amount || BigNumber.from(0),
							decimals['My LP']
						).toFixed(2)}
					</Typography>
					<Button
						variant="contained"
						color="info"
						fullWidth
						disabled={disabled}
						onClick={handleUnstake}
					>
						Claim & Unstake
					</Button>
				</DialogContent>
			</Dialog>
		</Box>
	);
};
