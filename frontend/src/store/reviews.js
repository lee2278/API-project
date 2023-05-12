import { csrfFetch } from "./csrf"

//ACTION TYPE CONSTANTS
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'

//ACTION CREATORS
export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})


//THUNKS
export const getReviewsBySpotThunk = (spotId) => async (dispatch) => {
    if (spotId) {
        const response = await fetch(`/api/spots/${spotId}/reviews`)

        if (response.ok) {
            const data = await response.json()
            const reviews = data.Reviews
            dispatch(loadReviews(reviews))
        }
    }
}

export const createReviewThunk = (review) => async () => {
   
        const response = await csrfFetch(`/api/spots/${review.spotId}/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(review)
        })

        if (response.ok) {
            const newReview = await response.json();
            return newReview
        } else {
            const errors = await response.json()
            return errors;
        }
    
}

//REDUCER

const initialState = { spot: {}, user: {} }

export const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
            const newState = { spot: {}, user: {} }
            if (action.reviews && typeof action.reviews !== 'string') action.reviews.forEach((review) => {
                newState.spot[review.id] = review
            })
            return newState
        }
        default: return state
    }
}
