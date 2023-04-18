import * as React from 'react';
import {
	AppBar,
	// Avatar,
	Button,
	CircularProgress,
	// IconButton,
	Toolbar,
	Typography,
} from '@mui/material';
import { Wallet as WalletIcon } from '@mui/icons-material';
import {
	useAccount,
	useConnect,
	useDisconnect,
	useNetwork,
	useSwitchNetwork,
	// useEnsAvatar,
	// useEnsName,
} from 'wagmi';
import { bsc } from 'wagmi/chains';

export type HeaderProps = {
	scrolled: boolean;
};

export const Header: React.FC<HeaderProps> = ({ scrolled }) => {
	const { address, isConnected } = useAccount();
	const { chain } = useNetwork();
	const { switchNetwork } = useSwitchNetwork();
	// const { data: ensAvatar } = useEnsAvatar({ address });
	// const { data: ensName } = useEnsName({ address });
	const { connect, connectors, isLoading, pendingConnector } = useConnect();
	const { disconnect } = useDisconnect();
	const shortenAddress = React.useMemo(
		() => (address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''),
		[address]
	);

	const handleConnect = React.useCallback(() => {
		if (isLoading) return;
		if (isConnected) {
			if (chain && chain.id === bsc.id) disconnect();
			else switchNetwork?.(bsc.id);
		} else connect({ connector: connectors[0] });
	}, [isLoading, isConnected, chain]);

	return (
		<AppBar
			position="absolute"
			color="transparent"
			sx={{
				boxShadow: scrolled
					? '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
					: 'none',
				backgroundColor: scrolled ? 'white' : 'transparent',
			}}
		>
			<Toolbar sx={{ justifyContent: 'flex-end' }}>
				{isConnected ? (
					<>
						{/* <Avatar
              src={ensAvatar || undefined}
              sx={{ width: 24, height: 24, background: "transparent" }}
            /> */}
						<WalletIcon />
						<Typography sx={{ mx: 1 }}>{shortenAddress}</Typography>
					</>
				) : null}
				<Button
					variant="contained"
					onClick={handleConnect}
					disabled={isLoading}
				>
					{isConnected ? (
						chain && chain.id === bsc.id ? (
							'Disconnect'
						) : (
							'Switch Network'
						)
					) : isLoading && connectors[0].id === pendingConnector?.id ? (
						<>
							<CircularProgress size={15} color="inherit" />
							&nbsp;Connecting
						</>
					) : (
						'Connect Wallet'
					)}
				</Button>
			</Toolbar>
		</AppBar>
	);
};
