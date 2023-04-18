import * as React from 'react';
import { Link, Typography } from '@mui/material';

export const LiquidityPool: React.FC = () => {
	return (
		<>
			<Typography
				sx={{
					fontWeight: 600,
					fontSize: '1.3rem',
					lineHeight: '1.9rem',
					color: 'var(--main)',
					mb: 3,
				}}
			>
				Liquidity Pool
			</Typography>
			<Typography
				sx={{
					fontSize: '1rem',
					lineHeight: '1.2rem',
					color: 'var(--main)',
					mb: 2,
				}}
			>
				There are several advantages to providing liquidity to the MyUSD/USDC
				liquidity pool. Some of the main benefits include:
			</Typography>
			<Typography
				sx={{
					fontSize: '1rem',
					lineHeight: '1.2rem',
					color: 'var(--main)',
					mb: 2,
				}}
			>
				<Typography component="span" sx={{ fontWeight: 600 }}>
					1 Passive income:
				</Typography>
				&nbsp;MyBricks incentivise market makers to provide liquidity through
				yield farming.
			</Typography>
			<Typography
				sx={{
					fontSize: '1rem',
					lineHeight: '1.2rem',
					color: 'var(--main)',
					mb: 2,
				}}
			>
				<Typography component="span" sx={{ fontWeight: 600 }}>
					2 Reduced volatility:
				</Typography>
				&nbsp;By providing liquidity to our pool, market makers help reduce the
				volatility of the assets being traded, in this case, MyUSD and USDC.
			</Typography>
			<Typography
				sx={{
					fontSize: '1rem',
					lineHeight: '1.2rem',
					color: 'var(--main)',
					mb: 2,
				}}
			>
				<Typography component="span" sx={{ fontWeight: 600 }}>
					3 Reduced Risk:
				</Typography>
				&nbsp;Impermanent loss is always a risk when providing liquidity to a
				pool. Fortunately, that is greatly diminished when providing liquidity
				to a stablecoin pair.
			</Typography>
			<Typography
				sx={{
					fontSize: '1rem',
					lineHeight: '1.2rem',
					color: 'var(--main)',
					mb: 2,
				}}
			>
				<Link href="#">Click here</Link>&nbsp;to learn how a Liquidity Pool
				works
			</Typography>
		</>
	);
};
