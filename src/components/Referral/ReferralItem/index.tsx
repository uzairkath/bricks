import { Avatar, Box, Typography } from '@mui/material';
import * as React from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

const IconImage = styled.img<{ bigIcon?: boolean }>((props) =>
	css({
		height: props.bigIcon ? '100%' : '60%',
	})
);

export type DashboardItemProps = {
	icon: string;
	value: string | number;
	label: string;
	unit?: string;
	bigIcon?: boolean;
};

export const ReferralItem: React.FC<DashboardItemProps> = ({
	icon,
	value,
	label,
	unit,
	bigIcon,
}) => {
	return (
		<Box
			sx={{
				padding: 2,
				height: '100%',
				position: 'relative',
				zIndex: 0,
				display: 'flex',
				borderRadius: 'var(--border-radius)',
				cursor: 'pointer',
				transition: 'all .3s ease',
				'&:hover': {
					boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.18)',
				},
			}}
		>
			<Avatar
				sx={{
					background: 'var(--light-transparent)',
					width: 48,
					height: 48,
					mr: 2,
				}}
			>
				<IconImage src={icon} bigIcon={bigIcon} />
			</Avatar>
			<Box>
				<Typography
					sx={{
						fontWeight: 500,
						fontSize: '1.3rem',
						lineHeight: '1.9rem',
						color: 'var(--main)',
					}}
				>
					{`${value}${unit ? ` ${unit}` : ''}`}
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
		</Box>
	);
};
