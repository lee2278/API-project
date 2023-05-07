import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSpotDetailsThunk } from '../../store/spots';

export default function GetSpotDetails() {
    const { spotId } = useParams();
    const spot = useSelector (state => state.singleSpot ? state.singleSpot : null)

    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId))
    }, [dispatch, spotId])

    return (
        <>
            <h1>{spot}</h1>
        </>
    )
}
