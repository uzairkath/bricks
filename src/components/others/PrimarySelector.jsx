import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { BsChevronDown } from 'react-icons/bs';
import Select from 'react-select';

const PrimarySelector = ({
	data,
	selection,
	handleSelection,
	stack = true,
}) => {
	console.log(data);
	return (
		<>
			<div className={`${!stack && 'not-stacked'} primary-selector`}>
				<div className="flex-wrap-items shrink">
					<Dropdown className="primary-selector-dropdown">
						<Dropdown.Toggle>
							{selection.icon && (
								<>
									<img src={selection.icon} className="smallest-icon " alt="" />
								</>
							)}
							{selection.label} <BsChevronDown />
						</Dropdown.Toggle>

						<Dropdown.Menu>
							{data.map((item) => {
								return (
									<>
										<Dropdown.Item
											className="d-flex justify-content-between align-items-center"
											onClick={() => {
												handleSelection(item);
											}}
										>
											{item.label}{' '}
											<img src={item.icon} className="smallest-icon" alt="" />
										</Dropdown.Item>
									</>
								);
							})}
						</Dropdown.Menu>
					</Dropdown>
					{stack && (
						<>
							<button className="normal-para light-muted py-0 pe-3">
								Card
							</button>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default PrimarySelector;
