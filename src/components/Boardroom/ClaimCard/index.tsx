import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

const IconImage = styled.img(
	css({
		width: 50,
		'@media (min-width: 768px)': {
			width: 80,
		},
		margin: '0 -6px',
	})
);

export type ClaimCardDataType = {
	title: string;
	icons: Array<string>;
	primaryButtonContent: React.ReactNode;
	primaryButtonDisabled?: boolean;
	primaryButtonHandler: () => Promise<void>;
	secondaryButtonContent: React.ReactNode;
	secondaryButtonDisabled?: boolean;
	secondaryButtonHandler: () => Promise<void>;
	valueLeft: number;
	valueRight: number;
	linkTextL?: string;
	linkTextR?: string;
};

export type ClaimCardProps = {
	data: ClaimCardDataType;
};

export const ClaimCard: React.FC<ClaimCardProps> = ({ data }) => {
	const {
		icons,
		title,
		valueLeft,
		valueRight,
		primaryButtonContent,
		primaryButtonDisabled,
		primaryButtonHandler,
		secondaryButtonContent,
		secondaryButtonDisabled,
		secondaryButtonHandler,
	} = data;

	return (
		<Box
			sx={{
				backgroundColor: `var(--light-transparent)`,
				borderRadius: 'var(--border-radius)',
				overflow: 'hidden',
				height: '100%',
			}}
		>
			<Box
				sx={{
					backgroundColor: 'var(--main)',
					padding: '2.5em',
					width: '100%',
				}}
			/>
			<Box
				sx={{
					width: '100%',
					textAlign: 'center',
					px: 2,
				}}
			>
				<Box sx={{ translate: '0 -50%', minHeight: [50, 80] }}>
					{icons?.map((icon, index) => {
						return <IconImage key={index} src={icon} alt="" />;
					})}
				</Box>
				<Box
					sx={{
						mt: ['-20px', '-30px'],
						mb: 2,
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<Typography
						sx={{
							flex: '1 0 0',
							fontWeight: 600,
							fontSize: ['1rem', '1.2rem'],
							lineHeight: ['1.2rem', '1.6rem'],
							color: 'var(--main)',
							whiteSpace: 'pre-line',
							textAlign: 'left',
						}}
					>
						{title}
					</Typography>
					<Box sx={{ flex: '1 0 0', textAlign: 'right' }}>
						<Typography
							sx={{
								fontSize: ['1rem', '1.4rem'],
								lineHeight: ['1.2rem', '1.6rem'],
								color: 'var(--main)',
							}}
						>
							{valueLeft.toFixed(3)}
						</Typography>
						<Typography
							sx={{
								fontSize: '0.8rem',
								lineHeight: '1rem',
								color: 'var(--main)',
							}}
						>
							= ${valueRight.toFixed(2)}
						</Typography>
					</Box>
				</Box>
				<Button
					variant="contained"
					sx={{ mb: 1 }}
					fullWidth
					onClick={primaryButtonHandler}
					disabled={primaryButtonDisabled}
				>
					{primaryButtonContent}
				</Button>
				<Button
					variant="contained"
					sx={{ mb: 1 }}
					fullWidth
					onClick={secondaryButtonHandler}
					disabled={secondaryButtonDisabled}
				>
					{secondaryButtonContent}
				</Button>
			</Box>
		</Box>
	);
};
