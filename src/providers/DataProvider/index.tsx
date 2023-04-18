import * as React from 'react';
import axios from 'axios';
import { useAccount, useNetwork, useProvider } from 'wagmi';
import { bsc } from 'wagmi/chains';

import { NFTCardProps, NFTMetaDataType } from '@components/Boardroom';
import {
	useBoardroom,
	useMyBond,
	useMyLp,
	useMyRocks,
	useMyUsd,
	useMyUsdRewardpool,
	useTreasury,
} from 'generated';
import { BigNumber } from 'ethers';
import { contractAddresses } from 'config';

export type TokenStatusType = {
	price: number;
	totalSupply: BigNumber;
	circulatingSupply: BigNumber;
	marketCap: BigNumber;
};

export type BondStatusType = TokenStatusType & { buyingPrice: number };

export type BalanceType = {
	'My USD': BigNumber;
	'My Rocks': BigNumber;
	'My Bond': BigNumber;
	'My LP': BigNumber;
};

export type DecimalsType = {
	'My USD': number;
	'My Rocks': number;
	'My Bond': number;
	'My LP': number;
};

export type PoolStatusType = {
	totalSupply: BigNumber;
	lockedAmount: BigNumber;
	myUsdPerSecond: BigNumber;
	myUsdBalance: BigNumber;
	reserveUsdc: BigNumber;
	reserveMyUsd: BigNumber;
};

type DataContextType = {
	disabled: boolean;
	myUsdTwap?: BigNumber;
	nfts: Array<NFTCardProps>;
	reloadNFTs: () => Promise<void>;
	stakedNFTs: Array<NFTCardProps>;
	reloadStakedNFTs: () => Promise<void>;
	myUsdStat?: TokenStatusType;
	myRocksStat?: TokenStatusType;
	myBondStat?: BondStatusType;
	myLpStat?: PoolStatusType;
	priceUsdc: number;
	reloadLP: () => Promise<void>;
	balance: BalanceType;
	decimals: DecimalsType;
};

const DataContext = React.createContext<DataContextType>({
	disabled: false,
	nfts: [],
	reloadNFTs: async () => {},
	stakedNFTs: [],
	reloadStakedNFTs: async () => {},
	priceUsdc: 1,
	reloadLP: async () => {},
	balance: {
		'My USD': BigNumber.from(0),
		'My Rocks': BigNumber.from(0),
		'My Bond': BigNumber.from(0),
		'My LP': BigNumber.from(0),
	},
	decimals: {
		'My USD': 18,
		'My Rocks': 0,
		'My Bond': 18,
		'My LP': 18,
	},
});

export const DataProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const provider = useProvider({ chainId: bsc.id });
	const { address, isConnected } = useAccount();
	const { chain } = useNetwork();

	const myRocksContract = useMyRocks({
		chainId: bsc.id,
		signerOrProvider: provider,
	});
	const boardroomContract = useBoardroom({
		chainId: bsc.id,
		signerOrProvider: provider,
	});
	const myLpContract = useMyLp({
		chainId: bsc.id,
		signerOrProvider: provider,
	});
	const myUsdContract = useMyUsd({
		chainId: bsc.id,
		signerOrProvider: provider,
	});
	const myBondContract = useMyBond({
		chainId: bsc.id,
		signerOrProvider: provider,
	});
	const myUsdRewardpoolContract = useMyUsdRewardpool({
		chainId: bsc.id,
		signerOrProvider: provider,
	});
	const treasuryContract = useTreasury({
		chainId: bsc.id,
		signerOrProvider: provider,
	});

	const [myUsdTwap, setMyUsdTwap] = React.useState<BigNumber>();
	const [nfts, setNFTs] = React.useState<Array<NFTCardProps>>([]);
	const [stakedNFTs, setStakedNFTs] = React.useState<Array<NFTCardProps>>([]);
	const [myUsdStat, setMyUsdStat] = React.useState<TokenStatusType>();
	const [myRocksStat, setMyRocksStat] = React.useState<TokenStatusType>();
	const [myBondStat, setMyBondStat] = React.useState<BondStatusType>();
	const [myLpStat, setMyLpStat] = React.useState<PoolStatusType>();
	const [priceUsdc, setPriceUsdc] = React.useState<number>(1);
	const [balance, setBalance] = React.useState<BalanceType>({
		'My USD': BigNumber.from(0),
		'My Rocks': BigNumber.from(0),
		'My Bond': BigNumber.from(0),
		'My LP': BigNumber.from(0),
	});
	const [decimals, setDecimals] = React.useState<DecimalsType>({
		'My USD': 18,
		'My Rocks': 0,
		'My Bond': 18,
		'My LP': 18,
	});
	const disabled = React.useMemo(
		() => !(isConnected && chain && chain.id === bsc.id),
		[isConnected, chain]
	);

	const loadMyUsdTwap = React.useCallback(async () => {
		if (treasuryContract && treasuryContract.provider) {
			try {
				const _myUsdTwap = await treasuryContract.getMyUSDUpdatedPrice();
				setMyUsdTwap(_myUsdTwap);
			} catch (err) {
				console.error(err);
			}
		}
	}, [treasuryContract]);

	const loadNFTs = React.useCallback(async () => {
		if (address && isConnected && myRocksContract && myRocksContract.provider) {
			try {
				// const _address = '0xd8d15C8f46414A45788Df126AF829104a6226dC5';
				const _tokenIndexArray = await myRocksContract.walletOfOwner(address);
				const _tokenURIArray: Array<string> = await Promise.all(
					_tokenIndexArray.map((_index) => myRocksContract.tokenURI(_index))
				);
				const _metadataArray: Array<NFTMetaDataType> = await Promise.all(
					_tokenURIArray.map((_uri) =>
						axios.get<NFTMetaDataType>(_uri).then((_res) => _res.data)
					)
				);
				setNFTs(
					_metadataArray.map((_item) => ({
						name: _item.name,
						image: _item.image,
					}))
				);
			} catch (err) {
				console.error(err);
			}
		} else setNFTs([]);
	}, [address, isConnected, myRocksContract]);

	const loadStakedNFTs = React.useCallback(async () => {
		if (
			address &&
			isConnected &&
			boardroomContract &&
			boardroomContract.provider &&
			myRocksContract &&
			myRocksContract.provider
		) {
			try {
				// const _address = '0xd8d15C8f46414A45788Df126AF829104a6226dC5';
				const _tokenIndexArray = await boardroomContract.getStakedIds(address);
				const _tokenURIArray: Array<string> = await Promise.all(
					_tokenIndexArray.map((_index) => myRocksContract.tokenURI(_index))
				);
				const _metadataArray: Array<NFTMetaDataType> = await Promise.all(
					_tokenURIArray.map((_uri) =>
						axios.get<NFTMetaDataType>(_uri).then((_res) => _res.data)
					)
				);
				setStakedNFTs(
					_metadataArray.map((_item) => ({
						name: _item.name,
						image: _item.image,
					}))
				);
			} catch (err) {
				console.error(err);
			}
		} else setStakedNFTs([]);
	}, [address, boardroomContract, isConnected, myRocksContract]);

	const loadLP = React.useCallback(async () => {
		try {
			const price = await axios.get<{ 'usd-coin': { usd: number } }>(
				'https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd'
			);
			setPriceUsdc(price.data['usd-coin'].usd);
			if (
				myLpContract &&
				myLpContract.provider &&
				myUsdRewardpoolContract &&
				myUsdRewardpoolContract.provider &&
				myUsdContract &&
				myUsdContract.provider
			) {
				const reserves = await myLpContract.getReserves();
				const totalSupply = await myLpContract.totalSupply();
				const lockedAmount = await myLpContract.balanceOf(
					contractAddresses['MyUSD REWARDPOOL']
				);
				const myUsdPerSecond = await myUsdRewardpoolContract.MyUSDPerSecond();
				const myUsdBalance = await myUsdContract.balanceOf(
					contractAddresses['MyUSD REWARDPOOL']
				);
				setMyLpStat({
					totalSupply,
					lockedAmount,
					myUsdPerSecond,
					myUsdBalance,
					reserveUsdc: reserves._reserve0,
					reserveMyUsd: reserves._reserve1,
				});
			}
		} catch (err) {
			console.error(err);
		}
	}, [myLpContract, myUsdRewardpoolContract, myUsdContract]);

	const loadMyUsdStat = React.useCallback(async () => {
		if (
			myUsdContract &&
			myUsdContract.provider &&
			myLpContract &&
			myLpContract.provider
		) {
			try {
				const totalSupply = await myUsdContract.totalSupply();
				const lockedInThePool = await myUsdContract.balanceOf(
					contractAddresses['MyUSD REWARDPOOL']
				);
				const lockedInTheTreasury = await myUsdContract.balanceOf(
					contractAddresses.Treasury
				);
				const circulatingSupply = totalSupply
					.sub(lockedInThePool)
					.sub(lockedInTheTreasury);
				const reserves = await myLpContract.getReserves();
				const price =
					reserves._reserve0.mul(10000).div(reserves._reserve1).toNumber() /
					10000;
				const marketCap = circulatingSupply
					.mul(reserves._reserve0)
					.div(reserves._reserve1);
				setMyUsdStat({
					price,
					circulatingSupply,
					totalSupply,
					marketCap,
				});
			} catch (err) {
				console.error(err);
			}
		}
	}, [myUsdContract, myLpContract]);

	const loadMyRocksStat = React.useCallback(async () => {
		if (myRocksContract && myRocksContract.provider) {
			const price = 500;
			const totalSupply = await myRocksContract.MAX_ROCKS();
			const circulatingSupply = await myRocksContract.totalSupply();
			const marketCap = circulatingSupply.mul(price);
			setMyRocksStat({
				price,
				circulatingSupply,
				totalSupply,
				marketCap,
			});
		}
	}, [myRocksContract]);

	const loadMyBondStat = React.useCallback(async () => {
		if (
			treasuryContract &&
			treasuryContract.provider &&
			myBondContract &&
			myBondContract.provider
		) {
			try {
				const totalSupply = await myBondContract.totalSupply();
				// const lockedInTheTreasury = await myBondContract.balanceOf(
				// 	contractAddresses.Treasury
				// );
				const circulatingSupply = totalSupply;
				const premiumRate = await treasuryContract.getBondPremiumRate();
				const discountRate = await treasuryContract.getBondDiscountRate();
				const price =
					premiumRate
						.mul(10000)
						.div(BigNumber.from(10).pow(decimals['My Bond']))
						.toNumber() / 10000;
				const buyingPrice =
					discountRate
						.mul(10000)
						.div(BigNumber.from(10).pow(decimals['My Bond']))
						.toNumber() / 10000;
				const marketCap = circulatingSupply
					.mul(premiumRate)
					.div(BigNumber.from(10).pow(decimals['My Bond']));

				setMyBondStat({
					price,
					buyingPrice,
					circulatingSupply,
					totalSupply,
					marketCap,
				});
			} catch (err) {
				console.error(err);
			}
		}
	}, [treasuryContract, myBondContract, decimals]);

	const loadDecimals = React.useCallback(async () => {
		if (
			myUsdContract &&
			myUsdContract.provider &&
			myRocksContract &&
			myRocksContract.provider &&
			myBondContract &&
			myBondContract.provider &&
			myLpContract &&
			myLpContract.provider
		) {
			const _myUsdDec = await myUsdContract.decimals();
			const _myRocksDec = 0;
			const _myBondDec = await myBondContract.decimals();
			const _myLpDec = await myLpContract.decimals();
			setDecimals({
				'My USD': _myUsdDec,
				'My Rocks': _myRocksDec,
				'My Bond': _myBondDec,
				'My LP': _myLpDec,
			});
		} else {
			setDecimals({
				'My USD': 0,
				'My Rocks': 0,
				'My Bond': 0,
				'My LP': 0,
			});
		}
	}, [myUsdContract, myRocksContract, myBondContract, myLpContract]);
	const loadBalance = React.useCallback(async () => {
		if (
			address &&
			isConnected &&
			myUsdContract &&
			myUsdContract.provider &&
			myRocksContract &&
			myRocksContract.provider &&
			myBondContract &&
			myBondContract.provider &&
			myLpContract &&
			myLpContract.provider
		) {
			const _myUsdBal = await myUsdContract.balanceOf(address);
			const _myRocksBal = await myRocksContract.balanceOf(address);
			const _myBondBal = await myBondContract.balanceOf(address);
			const _myLpBal = await myLpContract.balanceOf(address);
			setBalance({
				'My USD': _myUsdBal,
				'My Rocks': _myRocksBal,
				'My Bond': _myBondBal,
				'My LP': _myLpBal,
			});
		} else {
			setBalance({
				'My USD': BigNumber.from(0),
				'My Rocks': BigNumber.from(0),
				'My Bond': BigNumber.from(0),
				'My LP': BigNumber.from(0),
			});
		}
	}, [
		address,
		isConnected,
		myUsdContract,
		myRocksContract,
		myBondContract,
		myLpContract,
	]);

	React.useEffect(() => {
		loadMyUsdTwap();
	}, [loadMyUsdTwap]);

	React.useEffect(() => {
		loadNFTs();
	}, [loadNFTs]);

	React.useEffect(() => {
		loadStakedNFTs();
	}, [loadStakedNFTs]);

	React.useEffect(() => {
		loadLP();
	}, [loadLP]);

	React.useEffect(() => {
		loadMyUsdStat();
		loadMyRocksStat();
		loadMyBondStat();
	}, [loadMyUsdStat, loadMyRocksStat, loadMyBondStat]);

	React.useEffect(() => {
		loadDecimals();
	}, [loadDecimals]);

	React.useEffect(() => {
		loadBalance();
	}, [loadBalance]);

	const themeValue = React.useMemo(
		() => ({
			disabled,
			myUsdTwap,
			nfts,
			reloadNFTs: loadNFTs,
			stakedNFTs,
			reloadStakedNFTs: loadStakedNFTs,
			myUsdStat,
			myRocksStat,
			myBondStat,
			myLpStat,
			priceUsdc,
			balance,
			decimals,
			reloadLP: loadLP,
		}),
		[
			disabled,
			myUsdTwap,
			nfts,
			loadNFTs,
			stakedNFTs,
			loadStakedNFTs,
			myUsdStat,
			myRocksStat,
			myBondStat,
			myLpStat,
			priceUsdc,
			balance,
			decimals,
			loadLP,
		]
	);

	return (
		<DataContext.Provider value={themeValue}>{children}</DataContext.Provider>
	);
};

export const useData = () => {
	const {
		disabled,
		myUsdTwap,
		nfts,
		reloadNFTs,
		stakedNFTs,
		reloadStakedNFTs,
		myUsdStat,
		myRocksStat,
		myBondStat,
		myLpStat,
		priceUsdc,
		balance,
		decimals,
		reloadLP,
	} = React.useContext(DataContext);
	return {
		disabled,
		myUsdTwap,
		nfts,
		reloadNFTs,
		stakedNFTs,
		reloadStakedNFTs,
		myUsdStat,
		myRocksStat,
		myBondStat,
		myLpStat,
		priceUsdc,
		balance,
		decimals,
		reloadLP,
	};
};
