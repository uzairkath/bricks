import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { MessageBox, SwapCard } from '../components';
import ValueItem from '../components/buyredeem/ValueItem';
import { swapItems, valueItems } from '../dummyData';

const BuyRedeem = () => {
	return (
		<>
			<div className="page-styles nft-mint-page">
				<Container>
					<p className="section-title pb-1">BUY & REDEEM BONDS</p>
					<p className="normal-para muted pt-0 pb-2">
						Earn Premiums Upon Redemption
					</p>
					<div className="py-3">
						<MessageBox />
					</div>
					<Row className="py-3">
						<Col md={7}>
							<Row className="g-3">
								{valueItems.map((item) => {
									return (
										<>
											<Col lg={6}>
												<ValueItem data={item} />
											</Col>
										</>
									);
								})}
							</Row>
						</Col>
						<Col md={5}>
							<p className="normal-para muted">
								Purchasing BOND contributes to bringing MyUSD back to peg by
								burning the amount being sold. You can purchase BOND when
								current TWAP peg is below 1.00.
							</p>
							<p className="normal-para muted">
								After MyUSD regains it’s peg and current TWAP price is above
								1.01 redeeming becomes available
							</p>
						</Col>
					</Row>
					<Row className="py-3 g-5">
						{swapItems.map((item) => {
							return (
								<>
									<Col md={6}>
										<SwapCard data={item} />
									</Col>
								</>
							);
						})}
					</Row>
				</Container>
			</div>
		</>
	);
};

export default BuyRedeem;
