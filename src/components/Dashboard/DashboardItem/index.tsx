import { Avatar, Box, SxProps, Theme, Typography } from '@mui/material';
import * as React from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

const IconImage = styled.img<{ bigIcon?: boolean }>((props) =>
	css({
		width: props.bigIcon ? '100%' : '60%',
	})
);

export type DashboardItemProps = {
	icon: string;
	value: string | number;
	label: string;
	unit?: string;
	bigIcon?: boolean;
	simple?: boolean;
	sx?: SxProps<Theme>;
};

export const DashboardItem: React.FC<DashboardItemProps> = ({
	icon,
	value,
	label,
	unit,
	bigIcon,
	sx,
}) => {
	return (
		<Box
			sx={{
				padding: 2,
				height: '100%',
				position: 'relative',
				zIndex: 0,
				display: 'flex',
				...sx,
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
