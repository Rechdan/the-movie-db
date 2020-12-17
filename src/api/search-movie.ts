// npm
import { useMemo } from 'react';

// api
import { useApi } from 'api';

// types
export type FetchSearchMovieOptions = {
	query?: string;
};

export type FetchSearchMovieResult = {
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
export const useSearchMovie = ({ query }: FetchSearchMovieOptions) => {
	const fetchKeys = useMemo(() => {
		const fetchKeys = ['search/movie'];

		if (query) {
			fetchKeys.push(query);
		}

		return fetchKeys;
	}, [query]);

	return useApi<FetchSearchMovieResult>(fetchKeys, {}, { params: { query } });
};
