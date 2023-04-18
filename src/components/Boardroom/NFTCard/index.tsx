import * as React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

import nftCardImg from '@assets/images/nft_card_img.svg';
import nftProfileIcon from '@assets/images/nft_profile_icon.svg';
import bitcoinIcon from '@assets/images/bitcoin_icon.svg';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type NFTMetaDataType = {
	name: string;
	description: string;
	image: string;
	edition: number;
	attributes: Array<{ trait_type: string; value: string }>;
};

export type NFTCardProps = { name: string; image: string };

const CardImage = styled.img(
	css({
		width: '100%',
		display: 'block',
	})
);

const NFTProfileImage = styled.img(
	css({
		position: 'absolute',
		width: 60,
		height: 60,
		top: 0,
		left: '50%',
		borderRadius: '50%',
		translate: '-50% -50%',
	})
);

const BitcoinImage = styled.img(
	css({
		width: 20,
		marginRight: '4px',
	})
);

export const NFTCard: React.FC<NFTCardProps> = ({ name, image }) => {
	return (
		<Box
			sx={{
				height: [200, 230],
				width: [200, 220],
				overflow: 'hidden',
				borderRadius: 'var(--border-radius)',
				position: 'relative',
				backgroundColor: '#fff',
				'&:hover .nft-detail': { bottom: 0 },
			}}
		>
			<CardImage src={image} alt="" className="w-100 main-card-img" />
			<Box
				className="nft-detail"
				sx={{
					backgroundColor: '#fff',
					position: 'absolute',
					padding: '1rem',
					transition: 'all 0.3s ease',
					width: '100%',
					left: 0,
					bottom: -55,
				}}
			>
				<NFTProfileImage src={nftProfileIcon} alt="" />
				<Grid container>
					<Grid item xs={6} alignItems="center">
						<Typography
							sx={{
								overflow: 'hidden',
								whiteSpace: 'nowrap',
								textOverflow: 'ellipsis',
							}}
						>
							{name}
						</Typography>
					</Grid>
					<Grid
						item
						xs={6}
						display="flex"
						justifyContent="flex-end"
						alignItems="center"
					>
						<BitcoinImage src={bitcoinIcon} alt="" />
						<Typography>260</Typography>
					</Grid>
				</Grid>
				<Box sx={{ mt: 3, textAlign: 'center' }}>
					<Button variant="contained">View</Button>
				</Box>
			</Box>
		</Box>
	);
};
