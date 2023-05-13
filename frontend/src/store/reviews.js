import { csrfFetch } from "./csrf"

//ACTION TYPE CONSTANTS
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW'

//ACTION CREATORS
export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

export const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

export const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
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

export const createReviewThunk = (review) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${review.spotId}/reviews`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    })
   
    if (response.ok) {
        const newReview = await response.json();
        dispatch(createReview(newReview))

        console.log('this is inside the thunk')

        return newReview
    } else {
        const errors = await response.json()
        console.log('errors =====>', errors)
        return errors;
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
        case CREATE_REVIEW: {
            const newState = {...state, spot: {...state.spot}}
            
                newState.spot[action.review.id] = action.review

                console.log('this is inside the reducer')
        

           console.log('newState =====>',newState)


            return newState
        }

        

        case REMOVE_REVIEW: {
            const newState = {...state, spot: {...state.spot}}
            delete newState.spot[action.reviewId]

            console.log('this is insider delete reducer')
            return newState
        }
        default: return state
    }
}
