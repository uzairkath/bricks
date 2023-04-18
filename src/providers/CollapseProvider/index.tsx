import * as React from 'react';

type WidthType = {
	large: number;
	small: number;
	smallOverflowed: number;
	medium: number;
	mediumOverflowed: number;
};

type CollapseContextType = {
	setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
	collapsed: boolean;
	setOverflowed: React.Dispatch<React.SetStateAction<boolean>>;
	overflowed: boolean;
	setWidth: React.Dispatch<React.SetStateAction<WidthType>>;
	width: WidthType;
};

const CollapseContext = React.createContext<CollapseContextType>({
	setCollapsed: () => {},
	collapsed: false,
	setOverflowed: () => {},
	overflowed: false,
	setWidth: () => {},
	width: {
		large: 270,
		small: 44,
		smallOverflowed: 48,
		medium: 76,
		mediumOverflowed: 80,
	},
});

export const CollapseProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [collapsed, setCollapsed] = React.useState<boolean>(false);
	const [overflowed, setOverflowed] = React.useState<boolean>(false);
	const [width, setWidth] = React.useState<WidthType>({
		large: 270,
		small: 44,
		smallOverflowed: 48,
		medium: 76,
		mediumOverflowed: 80,
	});
	const themeValue = React.useMemo(
		() => ({
			setCollapsed,
			collapsed,
			setOverflowed,
			overflowed,
			setWidth,
			width,
		}),
		[collapsed, width]
	);

	return (
		<CollapseContext.Provider value={themeValue}>
			{children}
		</CollapseContext.Provider>
	);
};

export const useCollapse = () => {
	const {
		setCollapsed,
		collapsed,
		setOverflowed,
		overflowed,
		setWidth,
		width,
	} = React.useContext(CollapseContext);
	return {
		setCollapsed,
		collapsed,
		setOverflowed,
		overflowed,
		setWidth,
		width,
	};
};
