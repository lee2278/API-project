import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SpotForm from "./SpotForm"
import { getSpotDetailsThunk } from '../../store/spots'

export default function UpdateSpot() {
    const { spotId } = useParams()
    
    const spot = useSelector((state) => state.spots.singleSpot)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId))
    },[dispatch, spotId])

    
    return (
        <SpotForm spot={spot} formType="Update your Spot"/>
    )
}
