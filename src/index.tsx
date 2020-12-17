// npm
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

// components
import { App } from 'components/app';

// react dom render
ReactDOM.render(
	<>
		<HashRouter>
			<App />
		</HashRouter>
	</>,
	document.getElementById('root'),
);
