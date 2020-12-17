// api
import { useApi } from 'api';

// types
export type FetchMovieDetailsOptions = {
	movie_id: number;
};

export type FetchMovieDetailsResult = {
	adult: boolean;
	backdrop_path: string | null;
	belongs_to_collection: object | null;
	budget: number;
	genres: {
		id: number;
		name: string;
	}[];
	homepage: string | null;
	id: number;
	imdb_id: string | null;
	original_language: string;
	original_title: string;
	overview: string | null;
	popularity: number;
	poster_path: string | null;
	production_companies: {
		name: string;
		id: number;
		logo_path: string | null;
		origin_country: string;
	}[];
	production_countries: {
		iso_3166_1: string;
		name: string;
	}[];
	release_date: Date;
	revenue: number;
	runtime: number | null;
	spoken_languages: {
		iso_639_1: string;
		name: string;
	}[];
	status: string;
	tagline: string | null;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

// hook
export const useMovieDetails = ({ movie_id }: FetchMovieDetailsOptions) => {
	return useApi<FetchMovieDetailsResult>(`movie/${movie_id}`);
};
