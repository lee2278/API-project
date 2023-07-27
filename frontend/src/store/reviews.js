import { csrfFetch } from "./csrf"

//ACTION TYPE CONSTANTS
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const LOAD_USER_REVIEWS = 'reviews/LOAD_USER_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW'

//ACTION CREATORS
export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

export const loadUserReviews = (reviews) => ({
    type: LOAD_USER_REVIEWS,
    reviews
})

export const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

export const editReview = (review) => ({
    type: UPDATE_REVIEW,
    review
})

export const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
})

//THUNKS

export const getUserReviewsThunk = () => async(dispatch) => {
    const response = await  csrfFetch('/api/reviews/current')
    if (response.ok) {
        const data = await response.json()
        const reviews = data.Reviews
        dispatch(loadUserReviews(reviews))
    }
}


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

export const createReviewThunk = (review) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${review.spotId}/reviews`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const newReview = await response.json();
        dispatch(createReview(newReview))
        return newReview
    } else {
        const errors = await response.json()
        return errors;
    }

}

export const updateReviewThunk = (review) => async(dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
        
    })
    
    if (response.ok) {
        const updatedReview = await response.json()
        dispatch(editReview(updatedReview))
        return updatedReview
    } else {
        const errors = await response.json()
        return errors
    }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(removeReview(reviewId))
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
        case LOAD_USER_REVIEWS: {
            const newState = {...state, spot: {...state.spot}, user: {...state.user} }
            if (action.reviews && typeof action.reviews !== 'string') action.reviews.forEach((review) => {
                newState.user[review.id] = review
            })
            return newState
        }
        case CREATE_REVIEW: {
            const newState = { ...state, spot: { ...state.spot }, user:{...state.user}}
            newState.spot[action.review.id] = action.review
            return newState
        }
        case UPDATE_REVIEW: {
            const newState = {...state, spot: {...state.spot}, user: {...state.user}}
            newState.user[action.review.id] = action.review
            return newState
        }
        case REMOVE_REVIEW: {
            const newState = { ...state, spot: { ...state.spot }, user: {...state.user}}
            delete newState.spot[action.reviewId]
            delete newState.user[action.reviewId]

            return newState
        }
        default: return state
    }
}
