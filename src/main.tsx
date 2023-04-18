import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';

import App from './App';
// import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
// import "./assets/styles/styles.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
	WagmiProvider,
	ThemeProvider,
	CollapseProvider,
	DataProvider,
} from 'providers';
// import { ThemeProvider } from "react-bootstrap";
// import { ReferralProvider } from "./context/Referral";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<WagmiProvider>
			<ThemeProvider>
				<DataProvider>
					<CollapseProvider>
						<App />
						<CssBaseline />
					</CollapseProvider>
				</DataProvider>
			</ThemeProvider>
		</WagmiProvider>
	</React.StrictMode>
);
