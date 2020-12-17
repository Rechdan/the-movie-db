// npm
import React from 'react';

// hooks
import { DiscoverMoviesProvider } from 'hooks/discover-movies';

// components
import { Header } from 'components/header';
import { Movies } from 'components/movies';
import { SelectedMovie } from 'components/selected-movie';

// page
export const Home = () => {
	return (
		<DiscoverMoviesProvider>
			<Header />

			<Movies />

			<SelectedMovie />
		</DiscoverMoviesProvider>
	);
};
