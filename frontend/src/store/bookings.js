import { csrfFetch } from "./csrf"

//ACTION TYPE CONSTANTS
const LOAD_USER_BOOKINGS = 'bookings/LOAD_USER_BOOKINGS'
const UPDATE_BOOKING = 'bookings/UPDATE_BOOKING'
const REMOVE_BOOKING = 'bookings/REMOVE_BOOKING'

//ACTION CREATORS
export const loadUserBookings = (bookings) => ({
    type: LOAD_USER_BOOKINGS,
    bookings
})


export const editBooking = (singleBooking) => ({
    type: UPDATE_BOOKING,
    singleBooking
})

export const removeBooking = (bookingId) => ({
    type: REMOVE_BOOKING,
    bookingId
})


//THUNKS
export const getUserBookingsThunk = () => async (dispatch) => {
    const response = await fetch('/api/bookings/current')


    if (response.ok) {
        const data = await response.json()
        const bookings = data.Bookings
        dispatch(loadUserBookings(bookings))
    } else {
        const errors = await response.json()
        return errors;
    }
}


export const updateBookingThunk = (booking) => async(dispatch) => {
    const response = await csrfFetch(`/api/bookings/${booking.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
    })

    if (response.ok) { 
        const bookingToUpdate = await response.json()
        dispatch(editBooking(bookingToUpdate))
    } else {
        const errors = await response.json()
        return errors;
    }

}

export const deleteBookingThunk = (bookingId) => async(dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
    })

    if (response.ok) {
        dispatch(removeBooking(bookingId))
    } else {
        const errors = await response.json()
        return errors
    }
}


//REDUCER
const initialState = { user: {}, spot: {}}

export const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER_BOOKINGS: {
            const newState = { user: {}, spot: {}}
            if (action.bookings.length && typeof action.bookings !== 'string') action.bookings.forEach((booking) => {
                newState.user[booking.id] = booking
            })
            return newState;
        }
        case UPDATE_BOOKING: {
            const newState = {...state, user: {...state.user}, spot: {...state.spot}}
            //maybe need to fix something here
            newState.singleBooking = action.singleBooking
            return newState
        }
        case REMOVE_BOOKING: {
            const newState = { ...state, user: {...state.user}, spot: {...state.spot}}
            delete newState.user[action.bookingId]
            delete newState.spot[action.bookingId]
        }
        default:
            return state
    }
}
