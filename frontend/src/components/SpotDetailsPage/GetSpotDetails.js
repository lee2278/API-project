import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSpotDetailsThunk } from '../../store/spots';

export default function GetSpotDetails() {
    const { spotId } = useParams();
    const spot = useSelector (state => state.spots.singleSpot ? state.spots.singleSpot : null)

    console.log('spot =====>', spot)
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId))
    }, [dispatch, spotId])

    return (
        <>
            <h1>{spot.name}</h1>
        </>
    )
}
