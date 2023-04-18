import usdBadge from '@assets/images/usd_badge.svg';
import bondBadge from '@assets/images/bond_badge.svg';
import myRocksIcon from '@assets/images/my_rocks_icon.svg';

export const dashboardCards = [
	{
		header: {
			icon: usdBadge,
			value: 0.08,
			unit: 'LPs',
			label: 'MyUSD',
		},
		desc: '1 MyUSD (1.0 Peg) = 0.0808 BUSD',
		entries: [
			{
				label: 'Market Cap',
				value: 80,
			},
			{
				label: 'Circulating Supply',
				value: 1000,
			},
			{
				label: 'Total Supply',
				value: 1000,
			},
		],
		buttonText: 'BUY MyUSD',
	},
	{
		header: {
			icon: myRocksIcon,
			value: 1000,
			unit: 'USDC',
			label: 'ROCKS',
		},
		desc: '1 MyUSD (1.0 Peg) = 0.0808 BUSD',
		entries: [
			{
				label: 'Market Cap',
				value: 33.33,
			},
			{
				label: 'Circulating Supply',
				value: 50,
			},
			{
				label: 'Total Supply',
				value: 3333,
			},
		],
		buttonText: 'NFT MINT',
	},
	{
		header: {
			icon: bondBadge,
			value: 0.19,
			unit: 'LPs',
			label: 'BOND',
		},
		desc: '1 MyUSD (1.0 Peg) = 0.0808 BUSD',
		entries: [
			{
				label: 'Market Cap',
				value: 0.76,
			},
			{
				label: 'Circulating Supply',
				value: 4,
			},
			{
				label: 'Total Supply',
				value: 4,
			},
		],
		buttonText: 'BUY BOND',
		disabledButton: true,
	},
];

export const referralItems = [
	{
		icon: '/assets/images/down_icon.svg',
		value: '0',
		label: 'Referee',
		simple: true,
	},
	{
		icon: '/assets/images/amount_icon.svg',
		value: '0',
		label: 'Amount Earned',
	},
	{
		icon: '/assets/images/amount_icon.svg',
		value: '0',
		label: 'Balance',
		simple: true,
	},
];

export const valueItems = [
	{
		icon: usdBadge,
		equation: '1 MyUSD = X BUSD',
		desc: 'Last-Hour TWAP Price',
	},
	{
		icon: '/assets/images/bond_badge.svg',
		equation: '1 BOND = X BUSD',
		desc: 'Last-Hour TWAP Price',
	},
];

export const swapItems = [
	{
		title: 'Swap MyUSD for BOND',
		desc: '0.00 BOND available for purchase',
		buttonText: 'Purchase BOND',
		icons: ['assets/images/usd_badge.svg', 'assets/images/bond_badge.svg'],
	},
	{
		title: 'Swap BOND for MyUSD',
		desc: '0.00 BOND available in Wallet',
		buttonText: 'Redeem BOND',
		icons: ['assets/images/bond_badge.svg', 'assets/images/usd_badge.svg'],
	},
];
