import * as React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import {
	Announcement,
	DashboardCard,
	DashboardChart,
	DashboardItem,
	Resources,
} from '@components/Dashboard';
import usdBadge from '@assets/images/usd_badge.svg';
import bondBadge from '@assets/images/bond_badge.svg';
import myRocksIcon from '@assets/images/my_rocks_icon.svg';

import waveIcon from '@assets/images/wave.svg';
import thumbIcon from '@assets/images/thumb_icon.svg';
import valueIcon from '@assets/images/value_icon.svg';
import { useData } from '@providers/DataProvider';
import { getDisplayBalance } from 'utils';

export const Dashboard: React.FC = () => {
	const { myUsdStat, myRocksStat, myBondStat, priceUsdc, decimals } = useData();
	const dashboardItems = React.useMemo(
		() => [
			{
				icon: waveIcon,
				value: '0.08',
				unit: 'LPs',
				label: 'Peg Health',
			},
			{
				icon: thumbIcon,
				value: 'Loading...',
				label: 'Until next Epoch',
				simple: true,
			},
			{
				icon: valueIcon,
				value: '0',
				unit: 'LPs',
				label: 'Total Value Locked',
			},
		],
		[]
	);

	const dashboardCards = React.useMemo(
		() => [
			{
				header: {
					icon: usdBadge,
					value: myUsdStat ? myUsdStat.price : 'X',
					unit: 'USDC',
					label: 'MyUSD',
				},
				desc: `1 MyUSD (1.0 Peg) = ${myUsdStat ? myUsdStat.price : 'X'} USDC`,
				entries: [
					{
						label: 'Market Cap',
						value: myUsdStat
							? `$${(
									getDisplayBalance(myUsdStat.marketCap, decimals['My USD']) *
									priceUsdc
							  ).toFixed(3)}`
							: 'Loading...',
					},
					{
						label: 'Circulating Supply',
						value: myUsdStat
							? getDisplayBalance(
									myUsdStat.circulatingSupply,
									decimals['My USD']
							  )
							: 'Loading...',
					},
					{
						label: 'Total Supply',
						value: myUsdStat
							? getDisplayBalance(myUsdStat.totalSupply, decimals['My USD'])
							: 'Loading...',
					},
				],
				buttonText: 'BUY MyUSD',
			},
			{
				header: {
					icon: myRocksIcon,
					value: myRocksStat ? myRocksStat.price : 'X',
					unit: 'USDC',
					label: 'ROCKS',
				},
				desc: `1 Rock = ${myRocksStat ? myRocksStat.price : 'X'} USDC`,
				entries: [
					{
						label: 'Market Cap',
						value: myRocksStat
							? `$${(
									getDisplayBalance(
										myRocksStat.marketCap,
										decimals['My Rocks']
									) * priceUsdc
							  ).toFixed(3)}`
							: 'Loading...',
					},
					{
						label: 'Circulating Supply',
						value: myRocksStat
							? getDisplayBalance(
									myRocksStat.circulatingSupply,
									decimals['My Rocks']
							  )
							: 'Loading...',
					},
					{
						label: 'Total Supply',
						value: myRocksStat
							? getDisplayBalance(myRocksStat.totalSupply, decimals['My Rocks'])
							: 'Loading...',
					},
				],
				buttonText: 'NFT MINT',
			},
			{
				header: {
					icon: bondBadge,
					value:
						myBondStat && myUsdStat
							? (myBondStat.price * myUsdStat.price).toFixed(4)
							: 'X',
					unit: 'USDC',
					label: 'BOND',
				},
				desc: `1 BOND = ${
					myBondStat && myUsdStat
						? (myBondStat.price * myUsdStat.price).toFixed(4)
						: 'X'
				} USDC`,
				entries: [
					{
						label: 'Market Cap',
						value: myBondStat
							? `$${(
									getDisplayBalance(myBondStat.marketCap, decimals['My Bond']) *
									priceUsdc
							  ).toFixed(3)}`
							: 'Loading...',
					},
					{
						label: 'Circulating Supply',
						value: myBondStat
							? getDisplayBalance(
									myBondStat.circulatingSupply,
									decimals['My Bond']
							  )
							: 'Loading...',
					},
					{
						label: 'Total Supply',
						value: myBondStat
							? getDisplayBalance(myBondStat.totalSupply, decimals['My Bond'])
							: 'Loading...',
					},
				],
				buttonText: 'BUY BOND',
				disabledButton: true,
			},
		],
		[myUsdStat, myRocksStat, myBondStat, priceUsdc, decimals]
	);
	// const [loader, setLoader] = useState(false);
	//   const [user, setUser] = useLocalStorage("user", null);
	// const navigate = useNavigate();
	//   const { values } = useQueryParams();

	// useEffect(() => {
	//     (async () => {
	//         if (Object.keys(values).length > 0 && user === null) {
	//             try {
	//                 const res = await apis.authenticateUser(values);
	//                 const {token, expires} = res?.data?.data?.token?.access || {};
	//                 const dateTime = new Date("2023-02-24T06:56:46.630Z");
	//                 console.log(token, res?.data);
	//                 Cookie.set('token', token, {expires: dateTime})
	//                 await setUser(res?.data?.data);
	//                 setLoader(false)
	//             } catch (e) {
	//                 const msg = e?.response?.data?.message || JSON.stringify(e);
	//                 console.error(msg);
	//                 window.localStorage.clear();
	//                 alert(msg)
	//                 setLoader(false)
	//                 navigate('/')
	//             }
	//         } else {
	//             if (user === null) {
	//                 window.localStorage.clear();
	//                 setLoader(false)
	//                 navigate('/')
	//             }else {
	//                 setLoader(false);
	//             }
	//         }
	//     })()
	//     return () => {
	//     };
	// }, [user]);

	//   useEffect(() => {
	//     if (user) {
	//       navigate("/dashboard");
	//     }
	//   }, [user]);
	return (
		<Box
			sx={{
				py: 10,
				minHeight: '100%',
				background: 'var(--light-gradient)',
			}}
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
					Dashboard
				</Typography>
				<Grid container spacing={2}>
					{dashboardItems.map((dashboardItem, index) => {
						return (
							<Grid item key={index} xs={12} md={4} lg>
								<DashboardItem
									{...dashboardItem}
									sx={{
										borderRadius: 'var(--border-radius)',
										cursor: 'pointer',
										transition: 'all .3s ease',
										'&:hover': {
											boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.18)',
										},
									}}
								/>
							</Grid>
						);
					})}
				</Grid>
				<Typography
					sx={{
						fontWeight: 500,
						fontSize: '1.4rem',
						lineHeight: '1.6rem',
						color: 'var(--main)',
						my: 5,
					}}
				>
					Stake ROCKS and earn rewards in our seignorage stablecoin ecosystem.
				</Typography>
				<Grid container spacing={2}>
					{dashboardCards.map((dashboardCard, index) => (
						<Grid item key={index} xs={12} md={6} lg>
							<DashboardCard
								header={dashboardCard.header}
								// data={dashboardCard}
								handleClick={() => {}}
								desc={dashboardCard.desc}
								entries={dashboardCard.entries}
								buttonContent={dashboardCard.buttonText}
							/>
						</Grid>
					))}
				</Grid>
				<DashboardChart />
				<Resources />
				<Announcement />
			</Container>

			{/*
              <DashboardChart />
              <p className="sub-title fw-bold resources">Resources</p>
              <ul className="pb-4">
                <li>
                  <a href="#" className="normal-para blue">
                    AMA Videos
                  </a>
                </li>
                <li>
                  <a href="#" className="normal-para blue">
                    Knowledge Base
                  </a>
                </li>
                <li>
                  <a href="#" className="normal-para blue">
                    Learning Materials
                  </a>
                </li>
              </ul>
              <Announcement />
            </Container>
          </div>
        </div>
      )} */}
		</Box>
	);
};
