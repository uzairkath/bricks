import * as React from 'react';
import { Box, Typography } from '@mui/material';

import { NFTCard } from '../NFTCard';
import { useData } from 'providers';

export const OwnedNFTs: React.FC = () => {
	const { nfts } = useData();

	return nfts.length > 0 ? (
		<>
			<Typography
				sx={{
					fontWeight: 700,
					fontSize: '1.8rem',
					lineHeight: '2rem',
					color: 'var(--main)',
					my: 2,
				}}
			>
				NFTs in Your Wallet
			</Typography>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
					gap: '1em',
				}}
			>
				{nfts.map((nft, index) => (
					<NFTCard
						key={`${nft.name}_${index}`}
						name={nft.name}
						image={nft.image}
					/>
				))}
			</Box>
		</>
	) : null;
};
