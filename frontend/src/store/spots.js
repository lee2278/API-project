
//ACTION TYPE CONSTANTS
const LOAD_SPOTS = 'spots/getSpots'

//ACTION CREATORS
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
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



//REDUCER
const initialState = {allSpots:{}, singleSpot:{}}

export const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const newState = {...state};
            action.spots.forEach((spot) => {
                newState.allSpots[spot.id] = spot
            })
            return newState;
        }
        default:
            return state
    }
}
