// npm
import React, { useMemo } from 'react';
import styled from 'styled-components';
import cn from 'classnames';

// assets
import { SvgStarFilled } from 'assets/svg/star-filled';
import { SvgStarEmpty } from 'assets/svg/star-empty';

// api
import { useDiscoverMovie } from 'api/discover-movie';
import { useSearchMovie } from 'api/search-movie';

// hooks
import { useDiscoverMovies } from 'hooks/discover-movies';

// types
export type MovieProps = {
	movie_id: number;
	title: string;
	poster_path: string | null;
};

export type DisplayMoviesProps = {
	movies: MovieProps[];
};

// styles
const styles = {
	movies: {
		Container: styled.div`
			flex: 1 1 auto;

			max-width: calc(80% + 4rem);
			padding: 5rem 1rem;
			flex-flow: column;
			margin: 0 auto;
			display: flex;
			width: 100%;
		`,

		Title: styled.div`
			flex: 0 0 auto;

			margin-bottom: 1.25rem;
			font-weight: 700;
			font-size: 2rem;
			line-height: 1;
		`,

		Listing: styled.div`
			flex: 0 0 auto;

			grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr));
			display: grid;
			gap: 2.5rem;
		`,

		Empty: styled.div`
			flex: 0 0 auto;

			box-shadow: 0 0.5rem 1.5rem -0.5rem rgba(0, 0, 0, 0.6);
			background: rgba(153, 153, 153, 1);
			border-radius: 1rem;
			padding: 1rem 2rem;
			width: 100%;
		`,
	},

	rating: {
		Box: styled.div`
			flex: 0 0 auto;

			grid-auto-flow: column;
			margin-bottom: 2.5rem;
			margin-right: auto;
			display: grid;
			gap: 1rem;
		`,

		Item: styled.button`
			color: rgba(153, 153, 153, 1);
			background: transparent;
			height: 1.5rem;
			width: 1.5rem;

			&.active {
				color: rgba(11, 84, 230, 1);
			}
		`,
	},

	movie: {
		Movie: styled.button<{ poster_path: string | null }>`
			box-shadow: 0 0.5rem 1.5rem -0.5rem rgba(0, 0, 0, 0.8);
			border-radius: 1rem;

			${(p) =>
				p.poster_path
					? {
							backgroundImage: `url(https://image.tmdb.org/t/p/w500${p.poster_path})`,
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							paddingBottom: '150%',
					  }
					: {
							backgroundColor: 'rgba(77, 77, 77, 1)',
							paddingBottom: '150%',
							position: 'relative',
					  }};
		`,

		Title: styled.div`
			color: rgba(255, 255, 255, 1);
			justify-content: center;
			text-align: center;
			position: absolute;
			padding: 2rem 1rem;
			flex-flow: column;
			font-size: 1.5rem;
			display: flex;
			height: 100%;
			width: 100%;
		`,
	},
};

// components
export const Movies = () => {
	const { search } = useDiscoverMovies();

	if (search !== '') {
		return <FilterMovies />;
	} else {
		return <DiscoverMovies />;
	}
};

const DiscoverMovies = () => {
	const moviesRaw = useDiscoverMovie({ sort_by: 'popularity.desc' }).data?.results;

	const { rating } = useDiscoverMovies();

	const movies = useMemo(() => {
		return moviesRaw
			?.filter(({ vote_average }) => (rating > 0 ? (rating - 1) * 2 <= vote_average && rating * 2 >= vote_average : true))
			.map(({ id, title, poster_path }) => ({
				movie_id: id,
				title,
				poster_path,
			}));
	}, [moviesRaw, rating]);

	return <DisplayMovies movies={movies ?? []} />;
};

const FilterMovies = () => {
	const { search, rating } = useDiscoverMovies();

	const moviesRaw = useSearchMovie({ query: search }).data?.results;

	const movies = useMemo(() => {
		return moviesRaw
			?.filter(({ vote_average }) => (rating > 0 ? (rating - 1) * 2 <= vote_average && rating * 2 >= vote_average : true))
			.map(({ id, title, poster_path }) => ({
				movie_id: id,
				title,
				poster_path,
			}));
	}, [moviesRaw, rating]);

	return <DisplayMovies movies={movies ?? []} />;
};

const DisplayMovies = ({ movies }: DisplayMoviesProps) => {
	const { Container, Title, Listing, Empty } = styles.movies;

	const display = useMemo(() => {
		if (movies.length > 0) {
			return (
				<Listing
					children={movies.map((movieProps) => (
						<Movie {...movieProps} key={movieProps.movie_id} />
					))}
				/>
			);
		} else {
			return <Empty>No movies found!</Empty>;
		}
	}, [movies]);

	return (
		<Container>
			<Title>Discovered {movies.length} Movies</Title>

			<Rating />

			{display}
		</Container>
	);
};

const Movie = ({ movie_id, title, poster_path }: MovieProps) => {
	const { Movie, Title } = styles.movie;

	const { setSelectedMovie } = useDiscoverMovies();

	const emptyTitle = useMemo(() => (poster_path === null ? <Title children={title} /> : null), [poster_path, title]);

	return <Movie poster_path={poster_path} children={emptyTitle} onClick={() => setSelectedMovie(movie_id)} />;
};

const Rating = () => {
	const { Box, Item } = styles.rating;

	const { rating, setRating } = useDiscoverMovies();

	const stars = useMemo(() => {
		const stars: JSX.Element[] = [];

		for (let i = 1; i <= 5; i++) {
			const active = i <= rating;

			stars.push(
				<Item key={i} className={cn({ active })} onClick={() => setRating(i === rating ? 0 : i)}>
					{active ? <SvgStarFilled /> : <SvgStarEmpty />}
				</Item>,
			);
		}

		return stars;
	}, [rating]);

	return <Box children={stars} />;
};
