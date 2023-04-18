import * as React from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useAccount, useSigner } from 'wagmi';
import { bsc } from 'wagmi/chains';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import myRocksIcon from '@assets/images/my_rocks_icon.svg';
import bgImg from '@assets/images/large_card_bg.png';
import { useBoardroom, useMyRocks } from 'generated';
import { contractAddresses } from 'config';
import { Swal, Toast } from 'utils';
import { useData } from 'providers';
import { BigNumber } from 'ethers';

const RockImage = styled.img(
	css({
		width: 100,
		'@media (min-width: 768px)': {
			width: 150,
		},
	})
);

export const LargeCard: React.FC = () => {
	const { isConnected } = useAccount();
	const { data: signer } = useSigner();
	const myRocksContract = useMyRocks({
		chainId: bsc.id,
		signerOrProvider: signer,
	});
	const boardroomContract = useBoardroom({
		chainId: bsc.id,
		signerOrProvider: signer,
	});
	const [approved, setApproved] = React.useState<boolean>(false);
	const [stakeLoading, setStakeLoading] = React.useState<boolean>(true);
	const [canWithdraw, setCanWithdraw] = React.useState<boolean>(false);
	const [withdrawLoading, setWithdrawLoading] = React.useState<boolean>(false);
	const { disabled, nfts, reloadNFTs, stakedNFTs, reloadStakedNFTs } =
		useData();

	const loadApproval = React.useCallback(async () => {
		if (isConnected && myRocksContract && myRocksContract.signer) {
			try {
				setStakeLoading(false);
				const _address =
					(await myRocksContract.signer.getAddress()) as `0x${string}`;
				const _approved = await myRocksContract.isApprovedForAll(
					_address,
					contractAddresses.Boardroom
				);
				setApproved(_approved);
			} catch (err) {
				console.error(err);
			} finally {
				setStakeLoading(false);
			}
		}
	}, [myRocksContract, isConnected]);

	const loadCanWithdraw = React.useCallback(async () => {
		if (isConnected && boardroomContract && boardroomContract.signer) {
			try {
				setWithdrawLoading(true);
				const _address =
					(await boardroomContract.signer.getAddress()) as `0x${string}`;
				const _canWithdraw = await boardroomContract.canWithdraw(_address);
				setCanWithdraw(_canWithdraw);
			} catch (err) {
				console.error(err);
			} finally {
				setWithdrawLoading(false);
			}
		}
	}, [boardroomContract, isConnected]);

	React.useEffect(() => {
		loadApproval();
	}, [loadApproval]);

	React.useEffect(() => {
		loadCanWithdraw();
		const timer = setInterval(() => {
			loadCanWithdraw();
		}, 20000);
		return () => {
			clearInterval(timer);
		};
	}, [loadCanWithdraw]);

	const handleApprove = React.useCallback(async () => {
		if (isConnected && myRocksContract && myRocksContract.signer) {
			try {
				setStakeLoading(true);
				const tx = await myRocksContract.setApprovalForAll(
					contractAddresses.Boardroom,
					true
				);
				await tx.wait();
				Toast.fire({
					icon: 'success',
					title: 'Approved successfully.',
				});
			} catch (err) {
				console.error(err);
			} finally {
				loadApproval();
			}
		}
	}, [myRocksContract, isConnected, loadApproval]);

	const handleStake = React.useCallback(async () => {
		if (nfts.length <= 0) {
			await Swal.fire({
				icon: 'warning',
				title: 'You have no ROCKs in your wallet.',
			});
			return;
		}
		const result = await Swal.fire({
			title: 'How many ROCKs are you going to stake?',
			input: 'number',
			inputValue: 1,
			inputPlaceholder: 'Input the amount of ROCKs',
			confirmButtonText: 'Continue <i class="fa fa-arrow-right"></i>',
			inputValidator: (_amount) => {
				const _count = Number(_amount);
				return !Number.isInteger(_count)
					? 'Amount should be an integer.'
					: _count <= 0
					? 'Amount should be greater than 0.'
					: _count > nfts.length
					? 'Amount should be less than or equal to the balance.'
					: null;
			},
		});
		if (result.isConfirmed) {
			const _count = Number(result.value);
			if (
				Number.isInteger(_count) &&
				_count > 0 &&
				_count <= nfts.length &&
				isConnected &&
				boardroomContract &&
				boardroomContract.signer
			) {
				try {
					setStakeLoading(true);
					const tx = await boardroomContract.stake(BigNumber.from(_count));
					await tx.wait();
					Toast.fire({
						icon: 'success',
						title: 'Staked successfully.',
					});
					await reloadNFTs();
					await reloadStakedNFTs();
				} catch (err) {
					console.error(err);
				} finally {
					setStakeLoading(false);
				}
			}
		}
	}, [nfts, boardroomContract, isConnected, reloadNFTs, reloadStakedNFTs]);

	const handleWithdraw = React.useCallback(async () => {
		if (stakedNFTs.length <= 0) {
			await Swal.fire({
				icon: 'warning',
				title: 'You have no ROCKs in your wallet.',
			});
			return;
		}
		const result = await Swal.fire({
			title: 'How many ROCKs are you going to withdraw?',
			input: 'number',
			inputValue: 1,
			inputPlaceholder: 'Input the amount of ROCKs',
			confirmButtonText: 'Continue <i class="fa fa-arrow-right"></i>',
			inputValidator: (_amount) => {
				const _count = Number(_amount);
				return !Number.isInteger(_count)
					? 'Amount should be an integer.'
					: _count <= 0
					? 'Amount should be greater than 0.'
					: _count > stakedNFTs.length
					? 'Amount should be less than or equal to the staked amount.'
					: null;
			},
		});
		if (result.isConfirmed) {
			const _count = Number(result.value);
			if (
				Number.isInteger(_count) &&
				_count > 0 &&
				_count <= stakedNFTs.length &&
				isConnected &&
				boardroomContract &&
				boardroomContract.signer
			) {
				try {
					setWithdrawLoading(true);
					const tx = await boardroomContract.withdraw(BigNumber.from(_count));
					await tx.wait();
					Toast.fire({
						icon: 'success',
						title: 'Withdrew successfully.',
					});
					await reloadNFTs();
					await reloadStakedNFTs();
				} catch (err) {
					console.error(err);
				} finally {
					setWithdrawLoading(false);
				}
			}
		}
	}, [
		stakedNFTs,
		boardroomContract,
		isConnected,
		reloadNFTs,
		reloadStakedNFTs,
	]);

	return (
		<Box
			sx={{
				backgroundImage: `url(${bgImg})`,
				backdropFilter: 'brightness(0.9)',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				borderRadius: 'var(--border-radius)',
				overflow: 'hidden',
				height: '100%',
				py: 2,
			}}
		>
			<Grid container spacing={2} height="100%">
				<Grid
					item
					xs={12}
					md={6}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<RockImage src={myRocksIcon} alt="" />
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<Box
						sx={{
							textAlign: 'center',
							px: 2,
							width: '100%',
						}}
					>
						<Typography
							sx={{
								fontWeight: 500,
								fontSize: '1.6rem',
								lineHeight: '2rem',
								color: 'var(--main)',
							}}
						>
							ROCKS STAKED
						</Typography>
						<Typography
							sx={{
								fontSize: '1.4rem',
								lineHeight: '2rem',
								color: 'var(--main)',
							}}
						>
							$0.000
						</Typography>
						<Typography
							sx={{
								fontSize: '0.6rem',
								lineHeight: '0.8rem',
								color: 'var(--main)',
								mb: 5,
							}}
						>
							= $0.00
						</Typography>
						<Button
							variant="contained"
							fullWidth
							sx={{ mb: 1 }}
							disabled={
								disabled || stakeLoading || (approved && nfts.length <= 0)
							}
							onClick={approved ? handleApprove : handleStake}
						>
							{!isConnected ? (
								'Connect Wallet'
							) : approved ? (
								'Stake ROCKS'
							) : stakeLoading ? (
								<>
									<CircularProgress size={15} color="inherit" />
									&nbsp;Loading
								</>
							) : (
								'Approve ROCKS'
							)}
						</Button>
						<Button
							variant="contained"
							fullWidth
							sx={{ mb: 1 }}
							disabled={
								disabled ||
								withdrawLoading ||
								stakedNFTs.length <= 0 ||
								!canWithdraw
							}
							onClick={handleWithdraw}
						>
							{!isConnected ? (
								'Connect Wallet'
							) : withdrawLoading ? (
								<>
									<CircularProgress size={15} color="inherit" />
									&nbsp;Loading
								</>
							) : (
								'Claim & Unstake'
							)}
						</Button>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};
