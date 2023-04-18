import * as React from 'react';
import { useLocation } from 'react-router';
import { Outlet } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';
import { Box, BoxProps, SxProps, Theme } from '@mui/material';

const pageVariants = {
	initial: {
		transform: 'translateX(100%)',
	},
	in: {
		transform: 'translateX(0)',
	},
	out: {
		transform: 'translateX(-100%)',
	},
};

const pageTransition = {
	type: 'tween',
	ease: 'linear',
	duration: 0.2,
};

const MotionBox = motion(Box);

export type AnimationLayoutProps = {};

export const AnimationLayout = React.forwardRef<
	HTMLElement | SVGElement,
	AnimationLayoutProps
>((props, ref) => {
	const { pathname } = useLocation();
	return (
		<MotionBox
			ref={ref}
			key={pathname}
			initial="initial"
			animate="in"
			variants={pageVariants}
			transition={pageTransition}
			sx={{
				width: '100%',
				height: '100%',
				overflow: 'auto',
				'&::-webkit-scrollbar': {
					width: 6,
					height: 4,
				},
				'&::-webkit-scrollbar-thumb': {
					background: 'linear-gradient(180deg, #ff675a 0%, #ff895b 100%)',
					borderRadius: 10,
				},
			}}
		>
			<Outlet />
		</MotionBox>
	);
});
