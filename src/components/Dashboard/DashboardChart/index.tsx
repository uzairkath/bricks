import * as React from 'react';
// import { Dropdown } from 'react-bootstrap';
// import { FiChevronDown } from 'react-icons/fi';
// import { subDays, format, parseISO } from 'date-fns';
// import { AiFillCaretDown } from 'react-icons/ai';
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import axios from 'axios';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
// import PrimarySelector from '../others/PrimarySelector';

import bricksBadge from '@assets/images/bricks_badge.svg';

type MarketDataType = {
	prices: Array<[number, number]>;
	market_caps: Array<[number, number]>;
	total_volumes: Array<[number, number]>;
};

export const DashboardChart: React.FC = () => {
	const [data, setData] = React.useState<
		Array<{ date: number; value: number }>
	>([]);
	const [duration, setDuration] = React.useState<1 | 7 | 30 | 90 | 'max'>(1);

	const fetchData = React.useCallback(async () => {
		const marketChart = await axios.get<MarketDataType>(
			`https://api.coingecko.com/api/v3/coins/mybricks/market_chart?vs_currency=usd&days=${duration}`
		);
		setData(
			marketChart.data.prices.map((price) => ({
				date: price[0],
				value: price[1],
			}))
		);
	}, [duration]);

	React.useEffect(() => {
		fetchData();
	}, [fetchData]);

	const calcDigit = React.useCallback(
		(value: number, add = 1) =>
			value === 0 ? add : -Math.floor(Math.min(Math.log10(value) + 1, 0)) + add,
		[]
	);

	// const handleSelection = (entry) => {
	//   // console.log("entry")
	//   setSelection(entry);
	// };
	// const handleDuration = (event) => {
	// 	// setDuration(event.target.value);
	// 	console.log(duration);
	// };
	return (
		<>
			<Typography
				sx={{
					fontWeight: 700,
					fontSize: '1.8rem',
					lineHeight: '2rem',
					color: 'var(--main)',
					mt: 5,
					mb: 2,
				}}
			>
				Price Chart
			</Typography>
			<Grid container>
				<Grid item xs={12} md={6} display="flex" alignItems="center">
					<Avatar src={bricksBadge} />
					<Typography
						sx={{
							fontWeight: 500,
							fontSize: '1.2rem',
							lineHeight: '1.4rem',
							color: 'var(--main)',
							ml: 1,
						}}
					>
						BRICKS to USD chart
					</Typography>
				</Grid>
				<Grid item xs={12} md={6} textAlign="right">
					<Box
						sx={{
							backgroundColor: '#fff',
							borderRadius: '4px',
							display: 'inline-block',
						}}
					>
						{(
							[
								{ value: 1, label: '1D' },
								{ value: 7, label: '7D' },
								{ value: 30, label: '1M' },
								{ value: 90, label: '3M' },
								{ value: 'max', label: 'ALL' },
							] as const
						).map((item) => (
							<Button
								key={item.value}
								color="info"
								variant={item.value === duration ? 'contained' : 'text'}
								sx={{ m: 0.5, minWidth: 40, width: 40 }}
								onClick={() => {
									setDuration(item.value);
								}}
								disableRipple
							>
								{item.label}
							</Button>
						))}
					</Box>
				</Grid>
				<Grid item xs={12}>
					{data.length > 0 ? (
						<ResponsiveContainer width="100%" height={400}>
							<AreaChart data={data}>
								<Area dataKey="value" stroke="#7cc4fa" fill="#d6edfe" />
								<XAxis
									dataKey="date"
									axisLine={false}
									tickLine={false}
									tickCount={12}
									type="category"
									tick={{
										fill: '#002159',
										fontWeight: '500',
										fontSize: '0.8rem',
									}}
									tickFormatter={(_date: number) => {
										return new Date(_date).toLocaleString('en-US', {
											month: duration === 1 ? undefined : '2-digit',
											day: duration === 1 ? undefined : '2-digit',
											hour:
												duration === 1 || duration === 7
													? '2-digit'
													: undefined,
											minute:
												duration === 1 || duration === 7
													? '2-digit'
													: undefined,
											hour12: false,
										});
									}}
								/>
								<YAxis
									dataKey="value"
									// axisLine={false}
									// tickLine={false}
									tickCount={6}
									tickFormatter={(value: string) => value}
									type="number"
									domain={[
										() => 0,
										(dataMax: number) =>
											Math.ceil(Math.pow(10, calcDigit(dataMax)) * dataMax) /
											Math.pow(10, calcDigit(dataMax)),
									]}
								/>
								<Tooltip
									labelFormatter={(_date: number) =>
										new Date(_date).toLocaleString('en-US', {
											year: 'numeric',
											month: 'long',
											day: '2-digit',
											hour: '2-digit',
											minute: '2-digit',
											hour12: false,
										})
									}
								/>
								<CartesianGrid opacity={0.5} vertical={false} />
							</AreaChart>
						</ResponsiveContainer>
					) : null}
				</Grid>
			</Grid>
		</>
	);
	// 			{data.length > 0 && (
	// 				<div className="section-chart py-5">
	// 					<ResponsiveContainer width={'100%'} height={400}>
	// 						<AreaChart data={data}>
	// 							{/* <defs>
	//             <LinearGradient id="color" x1="0" y1="0" x2="0" y2="1">
	//               <stop offset={'0%'} stopColor="#ffffff" stopOpacity={0.4}/>
	//               <stop offset={'75%'} stopColor="#000000" stopOpacity={0.05}/>
	//             </LinearGradient>
	//           </defs> */}
	// 							<Area dataKey="value" stroke="#7cc4fa" fill="#d6edfe" />
	// 							<XAxis
	// 								dataKey="date"
	// 								axisLine={false}
	// 								tickLine={false}
	// 								tickCount={12}
	// 								type="category"
	// 								tick={{
	// 									fill: '#002159',
	// 									fontWeight: '500',
	// 									fontSize: '0.8rem',
	// 								}}
	// 								tickFormatter={(str) => {
	// 									const date = parseISO(str);
	// 									if (date.getDate() % 7 === 0) {
	// 										return format(date, 'MMM, d');
	// 									}
	// 									return '';
	// 								}}
	// 							/>
	// 							<YAxis
	// 								dataKey="value"
	// 								axisLine={false}
	// 								tickLine={false}
	// 								tickCount={6}
	// 								tickFormatter={data.map((i) => i)}
	// 							/>
	// 							<Tooltip content={data} />
	// 							<CartesianGrid opacity={0.5} vertical={false} />
	// 						</AreaChart>
	// 					</ResponsiveContainer>
	// 				</div>
	// 			)}
	// 		</article>
	// 	</>
	// );
};
