import * as React from 'react';
import { Alert, Box, Container, Grid, Typography } from '@mui/material';
import { useProvider, useSigner } from 'wagmi';
import { bsc } from 'wagmi/chains';

import { BondPrice, BondSwapCard, BondSwapCardProps } from '@components/Bond';
import usdBadge from '@assets/images/usd_badge.svg';
import bondBadge from '@assets/images/bond_badge.svg';
import { useTreasury } from 'generated';
import { Swal } from 'utils';

export const Bond: React.FC = () => {
	const { data: signer } = useSigner();
	const provider = useProvider({ chainId: bsc.id });

	const treasuryReadContract = useTreasury({
		chainId: bsc.id,
		signerOrProvider: provider,
	});

	const treasuryContract = useTreasury({
		chainId: bsc.id,
		signerOrProvider: signer,
	});

	const loadCanBuyAndSell = React.useCallback(async () => {
		if (treasuryReadContract && treasuryReadContract.provider) {
			try {
				const myUsdPrice = await treasuryReadContract.getMyUSDPrice();
				const myUsdPriceOne = await treasuryReadContract.myUsdPriceOne();
				const myUsdPriceCelling =
					await treasuryReadContract.myUsdPriceCeiling();
			} catch (err) {
				console.error(err);
			}
		}
	}, [treasuryReadContract]);

	const handleBuyBond = React.useCallback(async () => {
		if (treasuryContract && treasuryContract.signer) {
			try {
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
							: null;
					},
				});
			} catch (err) {
				console.error(err);
			}
		}
	}, [treasuryContract]);

	const swapCardsData = React.useMemo<Array<BondSwapCardProps>>(
		() => [
			{
				title: 'Swap MyUSD for BOND',
				fromCoinIcon: usdBadge,
				toCoinIcon: bondBadge,
				description: '0.00 BOND available for purchase',
				buttonContent: 'Purchase BOND',
				handleSwap: handleBuyBond,
			},
			{
				title: 'Swap BOND for MyUSD',
				fromCoinIcon: bondBadge,
				toCoinIcon: usdBadge,
				description: '0.00 BOND available in Wallet',
				buttonContent: 'Redeem BOND',
				handleSwap: () => {},
			},
		],
		[handleBuyBond]
	);

	return (
		<Box
			sx={{ py: 10, minHeight: '100%', background: 'var(--light-gradient)' }}
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
					BUY & REDEEM BONDS
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
					Earn Premiums Upon Redemption
				</Typography>
				<Alert
					variant="filled"
					severity="error"
					sx={{
						backgroundColor: (theme) => theme.palette.primary.light,
						justifyContent: 'center',
					}}
				>
					Claiming below 1.1 peg will not receive a redemption bonus, claim
					wisely!
				</Alert>
				<BondPrice />
				<Grid container spacing={2} mt={2} justifyContent="space-between">
					{swapCardsData.map((swapCardData, index) => (
						<Grid item key={index} xs={12} md={6} lg={5}>
							<BondSwapCard {...swapCardData} />
						</Grid>
					))}
				</Grid>
			</Container>
		</Box>
	);
};
