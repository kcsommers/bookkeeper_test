export const ORIENTATION_CHANGE = 'orientation:orientationChange'

export const orientationChange = (orientation) => ({
	type: ORIENTATION_CHANGE,
	payload: {orientation}
})