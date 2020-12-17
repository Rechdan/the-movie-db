// npm
import React, { createContext, FC, useState, useContext } from 'react';

// types
export type DiscoverMoviesContext = {
	search: string;
	rating: number;
	selectedMovie: number;

	setSearch(value: string): void;
	setRating(value: number): void;
	setSelectedMovie(value: number): void;
};

// context
const context = createContext<DiscoverMoviesContext>({} as DiscoverMoviesContext);

// provider
export const DiscoverMoviesProvider: FC = ({ children }) => {
	const [search, setSearch] = useState('');
	const [rating, setRating] = useState(0);
	const [selectedMovie, setSelectedMovie] = useState(0);

	return (
		<context.Provider
			value={{
				search,
				rating,
				selectedMovie,
				setSearch,
				setRating,
				setSelectedMovie,
			}}
			children={children}
		/>
	);
};

// hook
export const useDiscoverMovies = () => useContext(context);
