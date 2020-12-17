// api
import { useApi } from 'api';

// types
export type FetchDiscoverMovieOptions = {
	sort_by?: 'popularity.asc' | 'popularity.desc' | 'release_date.asc' | 'release_date.desc' | 'revenue.asc' | 'revenue.desc' | 'primary_release_date.asc' | 'primary_release_date.desc' | 'original_title.asc' | 'original_title.desc' | 'vote_average.asc' | 'vote_average.desc' | 'vote_count.asc' | 'vote_count.desc';
};

export type FetchDiscoverMovieResult = {
	page: number;
	results: {
		poster_path: string | null;
		adult: boolean;
		overview: string;
		release_date: string;
		genre_ids: number[];
		id: number;
		original_title: string;
		original_language: string;
		title: string;
		backdrop_path: string | null;
		popularity: number;
		vote_count: number;
		video: boolean;
		vote_average: number;
	}[];
	total_results: number;
	total_pages: number;
};

// hook
export const useDiscoverMovie = ({ sort_by }: FetchDiscoverMovieOptions) =>
	useApi<FetchDiscoverMovieResult>(
		'discover/movie',
		{},
		{
			params: {
				sort_by,
			},
		},
	);
