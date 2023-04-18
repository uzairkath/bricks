import * as React from 'react';
import {
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { Menu as MenuIcon, West as WestIcon } from '@mui/icons-material';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import BricksIcon from '@assets/images/bricks_icon.svg';
import DashboardIcon from '@assets/images/dashboard_icon.svg';
import FarmIcon from '@assets/images/farm_icon.svg';
import BoardroomIcon from '@assets/images/boardroom_icon.svg';
import MintIcon from '@assets/images/mint_icon.svg';
import BondIcon from '@assets/images/bond_icon.svg';
import ReferralIcon from '@assets/images/referral_icon.svg';
import PortfolioIcon from '@assets/images/portfolio_icon.png';
import AcademyIcon from '@assets/images/academy_icon.svg';
import { NavLink } from 'react-router-dom';
import { useCollapse } from '@providers/CollapseProvider';

const IconImage = styled.img(
	css({
		width: 30,
		height: 30,
	})
);

export const Sidebar = () => {
	const { setCollapsed, collapsed, width, overflowed, setOverflowed } =
		useCollapse();
	const ref = React.useRef<HTMLDivElement>(null);
	const drawerWidth = React.useMemo(
		() =>
			collapsed
				? overflowed
					? [width.smallOverflowed, width.mediumOverflowed]
					: [width.small, width.medium]
				: width.large,
		[collapsed, setOverflowed, overflowed]
	);

	React.useLayoutEffect(() => {
		const { current } = ref;
		if (current) {
			const hasOverflow = current.scrollHeight > current.clientHeight;
			setOverflowed(hasOverflow);
		}
	}, [ref]);

	React.useInsertionEffect(() => {
		const { current } = ref;
		if (current) {
			const hasOverflow = current.scrollHeight > current.clientHeight;
			setOverflowed(hasOverflow);
		}
	}, [ref]);

	return (
		<Drawer
			PaperProps={{ ref }}
			sx={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: drawerWidth,
				height: '100%',
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					height: '100%',
					transition: (theme) =>
						theme.transitions.create('width', {
							easing: theme.transitions.easing.sharp,
							duration: collapsed
								? theme.transitions.duration.enteringScreen
								: theme.transitions.duration.leavingScreen,
						}),

					boxSizing: 'border-box',
					background: 'linear-gradient(180deg, #ff675a 0%, #ff895b 100%)',
					padding: ['0.2rem', '0.3rem 1rem'],
					position: 'relative',
					border: 'none',
					'&::-webkit-scrollbar': {
						width: 4,
						height: 4,
					},
					'&::-webkit-scrollbar-thumb': {
						background: 'linear-gradient(180deg, #009688 0%, #00bcd4 100%)',
						borderRadius: 10,
					},
				},
			}}
			variant="permanent"
			anchor="left"
		>
			<List>
				<ListItem sx={{ p: ['4px', '8px'] }}>
					<ListItemIcon sx={{ minWidth: 30 }}>
						<IconImage src={BricksIcon} />
					</ListItemIcon>
					{collapsed ? null : (
						<ListItemText
							primary="MyBricks"
							primaryTypographyProps={{
								sx: {
									color: '#fff',
									lineHeight: '1.5rem',
									fontSize: '1.2rem',
									fontWeight: 700,
									whiteSpace: 'nowrap',
									overflow: 'hidden',
									marginLeft: 2,
								},
							}}
						/>
					)}
				</ListItem>
				<ListItem
					sx={{ my: 2, justifyContent: collapsed ? 'center' : 'flex-end' }}
				>
					<IconButton
						sx={{ width: [34, 46], height: [34, 46] }}
						onClick={(e) => setCollapsed((_value) => !_value)}
					>
						{collapsed ? (
							<MenuIcon sx={{ color: '#fff', width: 30, height: 30 }} />
						) : (
							<WestIcon sx={{ color: '#fff', width: 30, height: 30 }} />
						)}
					</IconButton>
				</ListItem>

				{[
					{ text: 'Dashboard', icon: DashboardIcon, link: '/dashboard' },
					{ text: 'Farm', icon: FarmIcon, link: '/farm' },
					{ text: 'Boardroom', icon: BoardroomIcon, link: '/boardroom' },
					{ text: 'NFT Mint', icon: MintIcon, link: '/nft-mint' },
					{ text: 'Bond', icon: BondIcon, link: '/bond' },
					{ text: 'Referral', icon: ReferralIcon, link: '/referral' },
					{ text: 'Portfolio', icon: PortfolioIcon, link: '/portfolio' },
					{ text: 'Academy', icon: AcademyIcon, link: '/academy' },
				].map(({ text, icon, link }, index) => (
					<ListItem key={`${text}_${index}`} disablePadding>
						<ListItemButton
							component={NavLink}
							to={link}
							sx={{
								opacity: 0.5,
								'&.active': { backgroundColor: '#FFFFFF33', opacity: 1 },
								'&:hover': { backgroundColor: '#FFFFFF33' },
								borderRadius: ['4px', '8px'],
								p: ['4px', '8px'],
								my: '2px',
							}}
							disableRipple
						>
							<ListItemIcon sx={{ minWidth: 30 }}>
								<IconImage src={icon} />
							</ListItemIcon>
							{collapsed ? null : (
								<ListItemText
									primary={text}
									primaryTypographyProps={{
										sx: {
											color: '#fff',
											lineHeight: '1.4rem',
											fontSize: '1.2rem',
											fontWeight: 700,
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											marginLeft: 2,
										},
									}}
								/>
							)}
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	);
};
