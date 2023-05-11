//ACTION TYPE CONSTANTS
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'

//ACTION CREATORS
export const loadReviews = (spot) =>({
    type: LOAD_REVIEWS,
    spot
})


//THUNKS
export const getReviewsBySpotThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`)

    if (response.ok) {
        const data = await response.json()
        const reviews = data.Reviews
        console.log('reviews ========>', reviews)
    }
}


//REDUCER

const initialState = { spot: {}, user: {} }

export const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
         const newState = { spot: {}, user: {} }
        //  newState.spot[review.id] = action.spot.review
        console.log('newState ======>', newState)
         return newState
        }
        default: return state
    }
}
