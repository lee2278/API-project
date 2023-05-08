//ACTION TYPE CONSTANTS
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'

//ACTION CREATORS
export const loadReviews = (spot) =>({
    type: LOAD_REVIEWS,
    spot
})


//THUNKS
export const getReviewsThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`)

    if (response.ok) {
        const data = await response.json()
        const reviews = data.reviews
        dispatch(loadReviews(reviews))
    }
}


//REDUCER

const initialState = {spot: {}}

export const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
            const newState = {...state};
            action.reviews.forEach(review => {
                newState.spot[review.id] = review
            })
        }
        default: return state
    }
}
