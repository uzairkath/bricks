import * as React from 'react';
import { Box, Link, Typography } from '@mui/material';

export const Regulation: React.FC = () => {
	return (
		<Box
			sx={{
				backgroundColor: 'var(--light-transparent)',
				borderRadius: 'var(--border-radius)',
				padding: '1.5em 2em',
				mb: 2,
			}}
		>
			<Typography
				sx={{
					fontWeight: 500,
					fontSize: '1.6rem',
					lineHeight: '2rem',
					color: 'var(--main)',
					mb: 1,
				}}
			>
				Boardroom Regulation
			</Typography>
			<Typography
				sx={{
					fontWeight: 500,
					fontSize: '1.2rem',
					lineHeight: '1.4rem',
					color: 'var(--main)',
					opacity: 0.7,
					mb: 1,
				}}
			>
				EPOCH Duration: 8 Hours
			</Typography>
			<Typography
				sx={{
					fontWeight: 500,
					fontSize: '1rem',
					lineHeight: '1.2rem',
					color: 'var(--main)',
					opacity: 0.7,
					mb: 1,
				}}
			>
				Deposit / Withdrawals of ROCKS into/from he Boardroom will lock ROCKS
				for 6 epochs and MyUSD rewards for 3 epochs. MyUSD rewards claim will
				lock staked ROCKS for 6 epochs and next MyUSD rewards can only be
				claimed 3 epochs later.
			</Typography>
			<Link
				href="https://docs.airbrick.finance/protocol/referral-system-and-whitelisted"
				target="_blank"
			>
				Learn More
			</Link>
		</Box>
	);
};
