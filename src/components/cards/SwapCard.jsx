import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { AiOutlineArrowRight } from 'react-icons/ai';

const SwapCard = ({ data }) => {
	const { title, desc, buttonText, icons } = data;
	return (
		<>
			<article className="swap-card">
				<div className="swap-card-h">
					<p className="large-para white">{title}</p>
				</div>
				<div className="swap-card-b">
					<div className="swap-img-container">
						<div className="swap-img-wrap">
							<div className="icon swap-icon">
								<AiOutlineArrowRight />
							</div>

							<div className="swap-images">
								<Row>
									<Col className="col-6 d-flex">
										<img src={icons[0]} className="large-icon mx-auto" alt="" />
									</Col>
									<Col className="col-6 d-flex">
										<img src={icons[1]} className="large-icon mx-auto" alt="" />
									</Col>
								</Row>
							</div>
						</div>
					</div>
					<p className="normal-p fw-bold text-center blue">{desc}</p>
					<div className="center-x">
						<button className="button px-sm-5 mt-5">{buttonText}</button>
					</div>
				</div>
			</article>
		</>
	);
};

export default SwapCard;
