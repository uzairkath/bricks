import * as React from 'react';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import usdBadge from '@assets/images/usd_badge.svg';
import bondBadge from '@assets/images/bond_badge.svg';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

const IconImage = styled.img(
	css({
		width: 50,
		'@media (min-width: 768px)': {
			width: 60,
		},
	})
);

export type BondSwapCardProps = {
	title: string;
	fromCoinIcon: string;
	toCoinIcon: string;
	description: string;
	buttonContent: React.ReactNode;
	handleSwap: React.MouseEventHandler<HTMLButtonElement>;
};

export const BondSwapCard: React.FC<BondSwapCardProps> = ({
	title,
	fromCoinIcon,
	toCoinIcon,
	description,
	buttonContent,
	handleSwap,
}) => {
	return (
		<Box
			sx={{
				backgroundColor: `var(--light-transparent)`,
				borderRadius: 'var(--border-radius)',
				boxShadow: 'var(--dark-shadow)',
				overflow: 'hidden',
				height: '100%',
			}}
		>
			<Box
				sx={{
					backgroundColor: 'var(--main)',
					px: 2,
					pt: 3,
					pb: 6,
					width: '100%',
				}}
			>
				<Typography
					sx={{
						fontWeight: 500,
						fontSize: '1.6rem',
						lineHeight: '1.8rem',
						color: '#fff',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						textAlign: 'center',
					}}
				>
					{title}
				</Typography>
			</Box>
			<Box
				sx={{
					width: '100%',
					textAlign: 'center',
					px: 2,
				}}
			>
				<Box
					sx={{
						translate: '0 -50%',
						minHeight: [50, 80],
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-around',
					}}
				>
					<IconImage src={fromCoinIcon} alt="" />
					<Avatar sx={{ background: (theme) => theme.palette.primary.main }}>
						<ArrowForwardIcon />
					</Avatar>
					<IconImage src={toCoinIcon} alt="" />
				</Box>
				<Box
					sx={{
						mt: ['-20px', '-30px'],
						mb: 2,
					}}
				>
					<Typography
						sx={{
							fontWeight: 500,
							fontSize: '1.2rem',
							lineHeight: '1.4rem',
							color: 'var(--main)',
							mb: 4,
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						{description}
					</Typography>
					<Button variant="contained" fullWidth onClick={handleSwap}>
						{buttonContent}
					</Button>
				</Box>
			</Box>
		</Box>
	);
};
