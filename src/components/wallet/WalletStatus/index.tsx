import { Grid, Typography } from '@mui/material';
import * as React from 'react';

export const WalletStatus: React.FC = () => {
	return (
		<Grid container columnSpacing={2} rowSpacing={6}>
			<Grid item xs={12}>
				<Typography
					sx={{
						fontSize: '1.3rem',
						lineHeight: '1.9rem',
						color: 'var(--main)',
					}}
				>
					Portfolio Value
				</Typography>
				<Typography
					sx={{
						fontWeight: 500,
						fontSize: '1.3rem',
						lineHeight: '1.9rem',
						color: 'var(--main)',
					}}
				>
					$0.05
				</Typography>
			</Grid>
			<Grid item xs={12} md={9}>
				<Typography
					sx={{
						fontSize: '1.3rem',
						lineHeight: '1.9rem',
						color: 'var(--main)',
					}}
				>
					Hour change
				</Typography>
				<Typography
					sx={{
						fontWeight: 500,
						fontSize: '1.3rem',
						lineHeight: '1.9rem',
						color: 'var(--main)',
					}}
				>
					$0.05
				</Typography>
			</Grid>
			<Grid item xs={12} md={3}>
				<Typography
					sx={{
						fontSize: '1.3rem',
						lineHeight: '1.9rem',
						color: 'var(--main)',
					}}
				>
					Assets
				</Typography>
				<Typography
					sx={{
						fontWeight: 500,
						fontSize: '1.3rem',
						lineHeight: '1.9rem',
						color: 'var(--main)',
					}}
				>
					4
				</Typography>
			</Grid>
		</Grid>
	);
};
