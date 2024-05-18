import { csrfFetch } from "./csrf"

//ACTION TYPE CONSTANTS
const LOAD_USER_BOOKINGS = 'bookings/LOAD_USER_BOOKINGS'
const LOAD_SPOT_BOOKINGS = 'bookings/LOAD_SPOT_BOOKINGS'
const CREATE_BOOKING =  'bookings/CREATE_BOOKING'
const UPDATE_BOOKING = 'bookings/UPDATE_BOOKING'
const REMOVE_BOOKING = 'bookings/REMOVE_BOOKING'


//ACTION CREATORS
export const loadUserBookings = (bookings) => ({
    type: LOAD_USER_BOOKINGS,
    bookings
})

const loadSpotBookings = (bookings) => ({
    type: LOAD_SPOT_BOOKINGS,
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

const createBooking = (singleBooking) => ({
    type: CREATE_BOOKING,
    singleBooking
})

//THUNKS
export const getUserBookingsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/bookings/current')


    if (response.ok) {
        const data = await response.json()
        const bookings = data.Bookings
        dispatch(loadUserBookings(bookings))
    } else {
        const errors = await response.json()
        return errors;
    }
}

export const getSpotBookingsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`)

    if (response.ok) {
        const data = await response.json()
        const spotBookings = data.Bookings
        dispatch(loadSpotBookings(spotBookings))

    } else {
        const errors = await response.json()
        return errors;
    }
}

export const createBookingThunk = (booking, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
    })

    if (response.ok) {
        const newBooking = await response.json();
        dispatch(createBooking(newBooking))
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
            return newState
        }
        case LOAD_SPOT_BOOKINGS: {
            const newState = {user: {...state.user}, spot: {}}
            newState.spot = action.bookings
            return newState
        }
        case UPDATE_BOOKING: {
            const newState = {...state, user: {...state.user}, spot: {...state.spot}}
            newState.spot[action.singleBooking.id] = action.singleBooking
            return newState
        }
        case REMOVE_BOOKING: {
            const newState = { ...state, user: {...state.user}, spot: {...state.spot}}

                delete newState.user[action.bookingId]
                delete newState.spot[action.bookingId]
                return newState
        }
        default:
            return state
    }
}
