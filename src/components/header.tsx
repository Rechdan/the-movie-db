// npm
import React, { useState } from 'react';
import styled from 'styled-components';

// assets
import { SvgSearch } from 'assets/svg/search';

// hooks
import { useDiscoverMovies } from 'hooks/discover-movies';

// styles
const styles = {
	header: {
		Header: styled.div`
			flex: 0 0 auto;

			background: url(/img/header.jpg) no-repeat 50% 70% / cover;
			box-shadow: 0 -1rem 3rem 1rem rgba(0, 0, 0, 0.8);
			flex-flow: column;
			display: flex;
		`,

		Container: styled.div`
			flex: 1 1 auto;

			backdrop-filter: blur(0.25rem);
			background: rgba(0, 0, 0, 0.5);
			padding: 5rem 1rem;
			flex-flow: column;
			display: flex;
		`,

		Title: styled.div`
			flex: 0 0 auto;

			text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.5);
			color: rgba(255, 255, 255, 1);
			margin-bottom: 5rem;
			text-align: center;
			font-weight: 700;
			font-size: 3rem;
			line-height: 1;
		`,
	},

	search: {
		Box: styled.div`
			flex: 0 0 auto;

			max-width: 35rem;
			margin: 0 auto;
			width: 100%;
		`,

		Form: styled.form`
			position: relative;
			width: 100%;
		`,

		Input: styled.input`
			box-shadow: 0 1rem 3rem -1rem rgba(0, 0, 0, 1);
			background: rgba(255, 255, 255, 1);
			border-radius: 1rem;
			padding-right: 4rem;
			padding-left: 2rem;
			height: 4rem;
			width: 100%;
		`,

		Submit: styled.button`
			transform: translateY(-50%);
			background: transparent;
			position: absolute;
			right: 0.5rem;
			height: 3rem;
			width: 3rem;
			top: 50%;

			& > svg {
				color: rgba(153, 153, 153, 1);
				height: 1.5rem;
			}
		`,
	},
};

// components
export const Header = () => {
	const { Header, Container, Title } = styles.header;

	return (
		<Header>
			<Container>
				<Title>Discover your favourite movies!</Title>

				<Search />
			</Container>
		</Header>
	);
};

const Search = () => {
	const { Box, Form, Input, Submit } = styles.search;

	const { search, setSearch } = useDiscoverMovies();

	const [value, setValue] = useState(search);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setSearch(value);
	};

	return (
		<Box>
			<Form onSubmit={onSubmit}>
				<Input placeholder='Search by keywords' value={value} onChange={(e) => setValue(e.currentTarget.value)} />

				<Submit type='submit'>
					<SvgSearch />
				</Submit>
			</Form>
		</Box>
	);
};
