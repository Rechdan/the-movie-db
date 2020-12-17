// npm
import React from 'react';
import styled from 'styled-components';

// api
import { useMovieDetails } from 'api/movie-details';

// hooks
import { useDiscoverMovies } from 'hooks/discover-movies';

// styles
const styles = {
	popup: {
		Popup: styled.div`
			backdrop-filter: blur(1rem);
			flex-flow: column;
			position: fixed;
			display: flex;
			height: 100%;
			width: 100%;
			left: 0;
			top: 0;
		`,

		ScrollView: styled.div`
			overflow-y: scroll;
			padding: 5rem 1rem;
			overflow-x: auto;
			position: fixed;
			height: 100%;
			width: 100%;
			left: 0;
			top: 0;
		`,

		Container: styled.div`
			box-shadow: 0 1rem 3rem -1rem rgba(0, 0, 0, 0.6);
			background: rgba(255, 255, 255, 1);
			border-radius: 1rem;
			max-width: 50rem;
			margin: 0 auto;
			padding: 2rem;
			width: 100%;
		`,
	},

	movie: {
		Body: styled.div`
			flex: 1 1 auto;

			flex-flow: row;
			display: flex;
		`,

		Poster: styled.div`
			flex: 0 0 auto;

			margin-right: 2rem;
			flex-flow: column;
			display: flex;
			width: 15rem;

			& > img {
				border-radius: 1rem;
				max-width: 100%;
			}
		`,

		Content: styled.div`
			flex: 1 1 auto;

			flex-flow: column;
			display: flex;
		`,

		Title: styled.div`
			flex: 0 0 auto;

			font-weight: 700;
			font-size: 2rem;
			line-height: 1;
		`,

		Genres: styled.div`
			flex: 0 0 auto;

			margin-top: 1rem;
			flex-flow: wrap;
			line-height: 1;
			display: flex;
			gap: 1rem;

			& > span {
				flex: 0 0 auto;

				background: rgba(217, 217, 217, 1);
				padding: 0.25rem 0.5rem;
				border-radius: 0.5rem;
			}
		`,

		Overview: styled.div`
			flex: 0 0 auto;

			margin-top: 1rem;
		`,
	},
};

// components
export const SelectedMovie = () => {
	const { Popup, ScrollView, Container } = styles.popup;

	const { selectedMovie, setSelectedMovie } = useDiscoverMovies();

	if (selectedMovie > 0) {
		return (
			<Popup onClick={() => setSelectedMovie(0)}>
				<ScrollView>
					<Container onClick={(e) => e.stopPropagation()}>
						<MovieDetails />
					</Container>
				</ScrollView>
			</Popup>
		);
	}

	return null;
};

const MovieDetails = () => {
	const { selectedMovie } = useDiscoverMovies();

	const movieData = useMovieDetails({ movie_id: selectedMovie }).data;

	if (!movieData) {
		return null;
	} else {
		const { Body, Poster, Content, Title, Genres, Overview } = styles.movie;

		const { poster_path, title, genres, overview } = movieData;

		return (
			<Body>
				{poster_path && (
					<Poster>
						<img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
					</Poster>
				)}

				<Content>
					<Title children={title} />

					{genres.length > 0 ? (
						<Genres
							children={genres.map(({ id, name }) => (
								<span key={id} children={name} />
							))}
						/>
					) : null}

					{overview && <Overview children={overview} />}
				</Content>
			</Body>
		);
	}
};
