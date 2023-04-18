import * as React from 'react';
import { Box, Typography } from '@mui/material';

export type FarmItemProps = {
	value: string | number;
	label: string;
	unit: string;
	unitPosition?: 'start' | 'end';
};

export const FarmItem: React.FC<FarmItemProps> = ({
	value,
	label,
	unit,
	unitPosition,
}) => {
	return (
		<Box
			sx={{
				background: 'var(--light-transparent)',
				borderRadius: 'var(--border-radius)',
				padding: '1em 2em',
				height: '100%',
				position: 'relative',
				cursor: 'pointer',
				zIndex: 0,
				overflow: 'hidden',
				'&::before': {
					position: 'absolute',
					bottom: 0,
					left: 0,
					content: "''",
					background: 'var(--primary-gradient)',
					width: '100%',
					height: '0',
					transition: 'height 0.3s ease',
					zIndex: -1,
				},
				'& *': { transition: 'color 0.2s ease' },
				'&:hover': {
					'& *': { color: 'var(--white)' },
					'&::before': {
						height: '100%',
					},
				},
			}}
		>
			<Typography
				sx={{
					fontWeight: 500,
					fontSize: '1.3rem',
					lineHeight: '1.9rem',
					color: 'var(--main)',
				}}
			>
				{unitPosition === 'start' ? `${unit}${value}` : `${value}${unit}`}
			</Typography>
			<Typography
				sx={{
					fontWeight: 500,
					fontSize: '1rem',
					lineHeight: '1.5rem',
					color: 'var(--main)',
				}}
			>
				{label}
			</Typography>
		</Box>
	);
};
