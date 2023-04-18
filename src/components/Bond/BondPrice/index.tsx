import * as React from 'react';
import { Avatar, Box, Grid, Typography } from '@mui/material';

import usdBadge from '@assets/images/usd_badge.svg';
import bondBadge from '@assets/images/bond_badge.svg';
import { useData } from '@providers/DataProvider';

export const BondPrice: React.FC = () => {
	const { myBondStat } = useData();

	return (
		<Grid container spacing={2} mt={2}>
			<Grid item xs={12} md={7} display="flex" alignItems="center">
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<Box
							sx={{
								background: 'var(--light-transparent)',
								borderRadius: 'var(--border-radius)',
								height: '100%',
								boxShadow: 'var(--dark-shadow)',
								p: 2,
							}}
						>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Avatar src={usdBadge} />
								<Typography
									sx={{
										fontWeight: 700,
										fontSize: '1.2rem',
										lineHeight: '1.4rem',
										color: 'var(--main)',
										ml: 1,
									}}
								>
									1 MyUSD = {myBondStat ? myBondStat.buyingPrice : 'X'} BOND
								</Typography>
							</Box>
							<Typography
								sx={{
									fontSize: '1rem',
									lineHeight: '1.2rem',
									color: 'var(--main)',
									mt: 2,
								}}
							>
								Last-Hour TWAP Price
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} md={6}>
						<Box
							sx={{
								background: 'var(--light-transparent)',
								borderRadius: 'var(--border-radius)',
								height: '100%',
								boxShadow: 'var(--dark-shadow)',
								p: 2,
							}}
						>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Avatar src={bondBadge} />
								<Typography
									sx={{
										fontWeight: 700,
										fontSize: '1.2rem',
										lineHeight: '1.4rem',
										color: 'var(--main)',
										ml: 1,
									}}
								>
									1 BOND = {myBondStat ? myBondStat.price : 'X'} MyUSD
								</Typography>
							</Box>
							<Typography
								sx={{
									fontSize: '1rem',
									lineHeight: '1.2rem',
									color: 'var(--main)',
									mt: 2,
								}}
							>
								Last-Hour TWAP Price
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} md={5}>
				<Typography
					sx={{
						fontSize: '1.2rem',
						lineHeight: '1.4rem',
						color: 'var(--main)',
						mb: 2,
					}}
				>
					Purchasing BOND contributes to bringing MyUSD back to peg by burning
					the amount being sold. You can purchase BOND when current TWAP peg is
					below 1.00.
				</Typography>
				<Typography
					sx={{
						fontSize: '1.2rem',
						lineHeight: '1.4rem',
						color: 'var(--main)',
					}}
				>
					After MyUSD regains it’s peg and current TWAP price is above 1.01
					redeeming becomes available.
				</Typography>
			</Grid>
		</Grid>
	);
};
