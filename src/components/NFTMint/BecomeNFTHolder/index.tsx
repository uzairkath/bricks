import * as React from 'react';
import { Link, Typography } from '@mui/material';

export const BecomeNFTHolder: React.FC = () => {
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
				Become a MyRocks NFT holder
			</Typography>
			<Typography
				sx={{
					fontSize: '1rem',
					lineHeight: '1.2rem',
					color: 'var(--main)',
					mb: 2,
				}}
			>
				Once you become and MyRock Share (ROCKS) holder, You are now part of a
				very select group of investors with some pretty amazing perks. Let&#39;s
				dive in:
			</Typography>
			<Typography
				sx={{
					fontSize: '1rem',
					lineHeight: '1.2rem',
					color: 'var(--main)',
					mb: 2,
				}}
			>
				1. Free Stay in UK (for now) with our NFT-based timeshare ownership.
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
				2. Returns of up to 60% APR from our protocol.
			</Typography>
			<Typography
				sx={{
					fontSize: '1rem',
					lineHeight: '1.2rem',
					color: 'var(--main)',
					mb: 2,
				}}
			>
				3. No locking period. Exit your investment by selling your ROCKS in the
				open market.
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
