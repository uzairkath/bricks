import * as React from 'react';
import { Box, Link, Typography } from '@mui/material';

export const Resources: React.FC = () => {
	return (
		<Box sx={{ borderTop: '4px solid var(--primary)' }}>
			<Typography
				sx={{
					fontWeight: 500,
					fontSize: '1.2rem',
					lineHeight: '1.4rem',
					color: 'var(--main)',
					pt: 2,
				}}
			>
				Resources
			</Typography>
			<Link href="#">AMA Videos</Link>
			<br />
			<Link href="#">Knowledge Base</Link>
			<br />
			<Link href="#">Learning Materials</Link>
		</Box>
	);
};
