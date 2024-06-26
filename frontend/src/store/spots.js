
import { csrfFetch } from "./csrf"

//ACTION TYPE CONSTANTS
const LOAD_SPOTS = 'spots/LOAD_SPOTS'
const LOAD_SPOT_DETAILS = 'spots/LOAD_SPOT_DETAILS'
const UPDATE_SPOT = 'spots/UPDATE_SPOT'
const REMOVE_SPOT = 'spots/REMOVE_SPOT'

//ACTION CREATORS
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

export const loadSpotDetails = (singleSpot) => ({
    type: LOAD_SPOT_DETAILS,
    singleSpot
})

export const editSpot = (singleSpot) => ({
    type: UPDATE_SPOT,
    singleSpot
})

export const removeSpot = (spotId) => ({
    type: REMOVE_SPOT,
    spotId
})


//THUNKS
export const getSpotsThunk = () => async (dispatch) => {
    const response = await fetch('/api/spots')


    if (response.ok) {

        const data = await response.json()
        const spots = data.Spots
        dispatch(loadSpots(spots))
    }
}

export const getUserSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current')

    if (response.ok) {
        const data = await response.json()
        const userSpots = data.Spots
        dispatch(loadSpots(userSpots))
    } else {
        const errors = await response.json()
        return errors;
    }
}

export const getSpotDetailsThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`)

    if (response.ok) {

        const spotDetails = await response.json()
        dispatch(loadSpotDetails(spotDetails))

    } else {
        const errors = await response.json()
        return errors;
    }
}



export const createSpotThunk = (spot, spotImages) => async () => {

    const formData = new FormData()

    const response = await csrfFetch('/api/spots', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const newSpot = await response.json();


        if (spotImages && spotImages.length !== 0) {
            for (let i = 0; i < spotImages.length; i++) {
                formData.append("image", spotImages[i]['url'])
                formData.append("preview", spotImages[i]['preview'])
            }
            await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: formData,

            })
        }
        return newSpot;
    } else {
        const errors = await response.json()
        return errors;
    }
}

export const updateSpotThunk = (spot, spotImages) => async (dispatch) => {

    const formData = new FormData()

    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const updatedSpot = await response.json()

        if (spotImages && spotImages.length !== 0) {
            for (let i = 0; i < spotImages.length; i++) {
                formData.append("image", spotImages[i]['url'])
                formData.append("preview", spotImages[i]['preview'])
            }
            await csrfFetch(`/api/spots/${updatedSpot.id}/images`, {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: formData,

            })
        }

        dispatch(editSpot(updatedSpot))
        return updatedSpot
    } else {
        const errors = await response.json()
        return errors
    }
}

export const deleteSpotImageThunk = (imageId) => async (dispatch) => {
    await csrfFetch(`/api/spot-images/${imageId}`, {
        method: 'DELETE'
    })
}



export const deleteSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(removeSpot(spotId))
    } else {
        const errors = await response.json()
        return errors;
    }
}

//REDUCER
const initialState = { allSpots: {}, singleSpot: {} }

export const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {

            const newState = { allSpots: {}, singleSpot: {} };
            if (action.spots.length && typeof action.spots !== 'string') action.spots.forEach((spot) => {

                newState.allSpots[spot.id] = spot
            })
            return newState;
        }
        case LOAD_SPOT_DETAILS: {
            const newState = { ...state };
            newState.singleSpot = action.singleSpot;
            return newState;

        }

        case UPDATE_SPOT: {
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
            newState.singleSpot = action.singleSpot
            return newState
        }
        case REMOVE_SPOT: {
            const newState = { ...state, allSpots: { ...state.allSpots } }
            delete newState.allSpots[action.spotId]
            return newState
        }

        default:
            return state
    }
}
