export const SET_SEARCH_RESULTS = 'searchResults:setSearchResults'

export const setSearchResults = (results) => ({
	type: SET_SEARCH_RESULTS,
	payload: {results}
})