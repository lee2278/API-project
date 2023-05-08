
//ACTION TYPE CONSTANTS
const LOAD_SPOTS = 'spots/LOAD_SPOTS'
const LOAD_SPOT_DETAILS = 'spotDetails/LOAD_SPOT_DETAILS'

//ACTION CREATORS
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

export const loadSpotDetails = (singleSpot) => ({
    type: LOAD_SPOT_DETAILS,
    singleSpot
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

//REDUCER
const initialState = {allSpots:{}, singleSpot:{}}

export const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const newState = {allSpots:{}, singleSpot:{}};
            action.spots.forEach((spot) => {
                newState.allSpots[spot.id] = spot
            })
            return newState;
        }
        case LOAD_SPOT_DETAILS: {
           const newState = {...state};
           newState.singleSpot = action.singleSpot;
           return newState;
           
        }
        default:
            return state
    }
}
