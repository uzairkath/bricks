import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import './nftpage.css';

const NFTPage = () => {
	const settings = {
		autoplay: true,
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,

		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 592,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	return (
		<>
			<div className="page-styles nft-page">
				<Container>
					<div className="pb-3 pb-sm-4 pb-md-5">
						<div className="flex-wrap-items shrink collapse-sm pb-2">
							<p className="sub-title blue">My NFTs</p>
							<p className="text-item blue semibold">Transaction History</p>
						</div>
						<p className="normal-para grey">xafasfasfaskahsdojsahdasohfa</p>
					</div>
					<div className="pb-3 pb-sm-4 pb-md-5">
						<div className="flex-wrap-items">
							<p className="sub-title blue">Rock Collection</p>
						</div>
						<p className="normal-para grey">MyRocks Collection</p>
					</div>
					<p className="sub-title blue pb-2">Community Collection</p>
					<div className="card-grid">
						{/* <NFTCard />

            <NFTCard />

            <NFTCard />

            <NFTCard />

            <NFTCard />

            <NFTCard />

            <NFTCard />

            <NFTCard />

            <NFTCard />

            <NFTCard />

            <NFTCard />

            <NFTCard /> */}
					</div>
				</Container>
			</div>
		</>
	);
};

export default NFTPage;
