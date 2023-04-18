import * as React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { AssetsTable, WalletStatus } from "../../components/wallet";

export const Wallet: React.FC = () => {
	return (
		<Box
			sx={{ py: 10, minHeight: '100%', background: 'var(--light-gradient)' }}
		>
			<Container>
				<Typography
					sx={{
						fontWeight: 700,
						fontSize: '1.8rem',
						lineHeight: '2rem',
						color: 'var(--main)',
						mb: 5,
					}}
				>
					Wallet
				</Typography>
				<WalletStatus />
				<AssetsTable />
			</Container>
		</Box>
	);
};
