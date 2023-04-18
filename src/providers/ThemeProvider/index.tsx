import * as React from 'react';
import {
	createTheme,
	Theme,
	ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';

export const themes = {
	light: createTheme({
		palette: {
			mode: 'light',
			primary: {
				main: '#ff675a',
				contrastText: '#fff',
			},
			secondary: {
				main: '#e91e63',
				contrastText: '#fff',
			},
		},
		typography: {
			fontFamily: 'Poppins',
		},
	}),
	dark: createTheme({
		palette: {
			mode: 'dark',
		},
	}),
};

export type ThemeType = keyof typeof themes;

type ThemeContextType = {
	changeTheme: (_themeNum: ThemeType) => void;
	themeType: ThemeType;
};

const ThemeContext = React.createContext<ThemeContextType>({
	changeTheme: (_themeNum: ThemeType) => {},
	themeType: 'light',
});

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [themeType, setThemeType] = React.useState<ThemeType>('light');

	const themeValue = React.useMemo(
		() => ({
			changeTheme: (_themeType: ThemeType) => setThemeType(_themeType),
			themeType,
		}),
		[themeType]
	);

	return (
		<ThemeContext.Provider value={themeValue}>
			<MuiThemeProvider theme={themes[themeType]}>{children}</MuiThemeProvider>
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const { changeTheme, themeType } = React.useContext(ThemeContext);
	return { changeTheme, themeType };
};
