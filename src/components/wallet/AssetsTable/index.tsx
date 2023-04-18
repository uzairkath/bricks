import * as React from 'react';
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { useState, useRef } from 'react';
import Web3 from 'web3';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
let myUSD, myRocks, myLP, bricks;

import rocksIcon from '@assets/images/my_rocks_icon.svg';
import usdBadge from '@assets/images/usd_badge.svg';
import usdcImg from '@assets/images/usdc.png';
import bricksIcon from '@assets/images/bricks_icon_orange.svg';
import { bricksAbi, myLpABI, myRocksABI, myUsdABI } from 'generated';
import { getBalance } from '@utils/';

const TokenImage = styled.img<{ margin?: 'left' | 'right' | 'both' }>((props) =>
	css({
		height: 35,
		marginLeft: props.margin === 'left' || props.margin === 'both' ? -6 : 0,
		marginRight: props.margin === 'right' || props.margin === 'both' ? -6 : 0,
	})
);

export const AssetsTable: React.FC = () => {
	const [accounts, setAccounts] = useState([]);
	const [myUsdBalance, setMyUsdBalance] = useState(0);
	const [myRocksBalance, setMyRocksBalance] = useState(0);
	const [myLpBalance, setMyLpBalance] = useState(0);
	const [myBricksBalance, setMyBricksBalance] = useState(0);
	const [web3, setWeb3] = useState();

	async function walletInit() {
		if (typeof window.ethereum != 'undefined') {
			const provider = window.ethereum;
			const desiredChainId = '0x38'; // Binance Smart Chain Mainnet
			provider
				.request({ method: 'eth_requestAccounts' })
				.then(() => {
					provider.request({ method: 'net_version' }).then((networkId) => {
						if (networkId !== desiredChainId) {
							provider
								.request({
									method: 'wallet_switchEthereumChain',
									params: [{ chainId: desiredChainId }],
								})
								.then(() => {
									console.log('Switched to Binance Smart Chain Mainnet!');
									if (web3 == undefined) {
										console.log('empty');
										let _web3 = new Web3(window.ethereum);
										setWeb3(_web3);
										console.log(web3);
									}
								})
								.catch((error) => {
									console.error(error);
								});
						} else {
							console.log('Still on Binance Smart Chain Mainnet!');
						}
					});
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			window.alert('Please install metamask');
		}
	}
	async function initContracts() {
		myUSD = new web3.eth.Contract(
			myUsdABI,
			'0xAD9317601872De47a92A175a94Feb18e72CB5bD5'
		);
		myRocks = new web3.eth.Contract(
			myRocksABI,
			'0x6D635dc4a2A54664B54dF6a63e5ee31D5b29CF6e'
		);
		myLP = new web3.eth.Contract(
			myLpABI,
			'0x85f94745D1B401617119a4E53F11484053C0EA42'
		);
		bricks = new web3.eth.Contract(
			bricksAbi,
			'0x13E1070E3a388e53Ec35480Ff494538f9FFc5b8D'
		);
	}
	async function initAccounts() {
		console.log(accounts);

		if (accounts.length === 0) {
			console.log('hello');
			const _accounts = await window.ethereum.request({
				method: 'eth_requestAccounts',
			});
			setAccounts(_accounts);
		}
	}
	async function getBalances(address) {
		console.log(await web3.eth.getChainId());
		let myUsdBal = await myUSD.methods.balanceOf(address).call();
		let myUsdDecimal = await myUSD.methods.decimals().call();
		let myRocksBal = await myRocks.methods.balanceOf(address).call();
		//let myRockDecimal = await myRocks.methods.decimals().call();
		let myLpBal = await myLP.methods.balanceOf(address).call();
		let myLpDecimal = await myLP.methods.decimals().call();
		let bricksBal = await bricks.methods.balanceOf(address).call();
		let bricksDecimal = await bricks.methods.decimals().call();

		setMyUsdBalance(parseInt(myUsdBal / 10 ** myUsdDecimal).toFixed(1));
		setMyRocksBalance(parseInt(myRocksBal).toFixed(1));
		setMyLpBalance(parseInt(myLpBal / 10 ** myLpDecimal).toFixed(1));
		setMyBricksBalance(parseInt(bricksBal / 10 ** bricksDecimal).toFixed(1));
	}
	async function main() {
		await walletInit();
		await initContracts();
		await initAccounts();
		await getBalances('0xd8d15C8f46414A45788Df126AF829104a6226dC5');
		console.log(myUsdBalance);
		console.log(myRocksBalance);
		console.log(myLpBalance);
		console.log(myBricksBalance);
	}

	const rows = React.useMemo(
		() => [
			{
				icon: <TokenImage src={rocksIcon} />,
				name: 'ROCKS',
				amount: myRocksBalance,
				price: 0,
			},
			{
				icon: <TokenImage src={usdBadge} />,
				name: 'MyUSD',
				amount: myUsdBalance,
				price: 0,
			},
			{
				icon: (
					<>
						<TokenImage src={usdcImg} margin="right" />
						<TokenImage src={usdBadge} margin="left" />
					</>
				),
				name: 'LP Tokens',
				amount: myLpBalance,
				price: 0,
			},
			{
				icon: <TokenImage src={bricksIcon} />,
				name: 'Bricks',
				amount: myBricksBalance,
				price: 0,
			},
		],
		[]
	);
	React.useEffect(() => {
		main();
	});
	return (
		<Box sx={{ mt: 5 }}>
			<Typography>Overview</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell colSpan={2}>Asset</TableCell>
							<TableCell align="right">Amount</TableCell>
							<TableCell align="right">Current USD</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row.name}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell width={100}>{row.icon}</TableCell>
								<TableCell>{row.name}</TableCell>
								<TableCell align="right">{row.amount}</TableCell>
								<TableCell align="right">{row.price}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

