// npm
import { createGlobalStyle, css } from 'styled-components';

// components
export const Style = createGlobalStyle`${css`
	/* global */

	* {
		box-sizing: border-box;
		padding: 0;
		border: 0;
		margin: 0;

		&:focus,
		&:active {
			outline: none;
		}

		& > * {
			color: inherit;
			font: inherit;
		}
	}

	/* html */

	html {
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		background: #fafafa;
		line-height: 1.5;
		overflow: hidden;
		font-size: 18px;
	}

	a {
		text-decoration: none;
	}

	a,
	label,
	button {
		cursor: pointer;
	}
`}`;
