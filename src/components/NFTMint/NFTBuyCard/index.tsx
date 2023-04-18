import * as React from 'react';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import myRocksIcon from '@assets/images/my_rocks_icon.svg';
import masterCardImg from '@assets/images/master_card.png';
import americanExpressImg from '@assets/images/american_express.png';
import visaImg from '@assets/images/visa.png';
import bitcoinIcon from '@assets/images/bitcoin_icon.svg';
import bnbIcon from '@assets/images/bnb_icon.svg';
import usdcImg from '@assets/images/usdc.png';

const GatewayImage = styled.img<{ margin?: 'left' | 'right' | 'both' }>(
	(props) =>
		css({
			height: 20,
			marginLeft: props.margin === 'left' || props.margin === 'both' ? 5 : 0,
			marginRight: props.margin === 'right' || props.margin === 'both' ? 5 : 0,

			// '@media (min-width: 768px)': {
			// 	height: 30,
			// },
			// '@media (min-width: 1200px)': {
			// 	height: 40,
			// },
		})
);

export const NFTBuyCard: React.FC = () => {
	return (
		<Box
			sx={{
				backgroundColor: `var(--light-transparent)`,
				borderRadius: 'var(--border-radius)',
				overflow: 'hidden',
				boxShadow: 'var(--dark-shadow)',
				width: ['100%', '80%'],
			}}
		>
			<Box
				sx={{
					backgroundColor: '#fff',
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					p: 2,
				}}
			>
				<Avatar src={myRocksIcon} />
				<Typography
					sx={{
						fontWeight: 600,
						fontSize: ['1rem', '1.4rem'],
						lineHeight: ['1.2rem', '1.6rem'],
						color: 'var(--main)',
						ml: 2,
					}}
				>
					Buy ROCKS
				</Typography>
			</Box>

			<Box sx={{ p: 2 }}>
				<Button variant="contained" fullWidth>
					Buy with Fiat
				</Button>
				<Button variant="contained" fullWidth sx={{ mt: 2 }}>
					Buy with Crypto
				</Button>
				<Grid container sx={{ mt: 2 }}>
					<Grid item xs={6}>
						<GatewayImage src={masterCardImg} margin="right" />
						<GatewayImage src={americanExpressImg} margin="right" />
						<GatewayImage src={visaImg} />
					</Grid>
					<Grid item xs={6} textAlign="right">
						<GatewayImage src={bitcoinIcon} margin="right" />
						<GatewayImage src={bnbIcon} margin="right" />
						<GatewayImage src={usdcImg} />
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};
