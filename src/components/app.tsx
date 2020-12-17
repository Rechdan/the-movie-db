// npm
import React from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';

// assets
import { Style } from 'assets/css/style';

// pages
import { Home } from 'pages/home';

// styles
const styles = {
	app: {
		App: styled.div`
			overflow-y: scroll;
			flex-flow: column;
			overflow-x: auto;
			position: fixed;
			display: flex;
			height: 100%;
			width: 100%;
			left: 0;
			top: 0;
		`,
	},
};

// components
export const App = () => {
	const { App } = styles.app;

	return (
		<>
			<Style />

			<App>
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
			</App>
		</>
	);
};
