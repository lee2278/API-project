import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSpotBookingsThunk } from '../../store/bookings'

export default function GetSpotBookings() {
    const dispatch = useDispatch()

    const { spotId } = useParams() 


    useEffect(() => {
        dispatch(getSpotBookingsThunk(spotId))
    }, [dispatch])

    return(
        <>
        <div>
            <h2>Your trip</h2>
            <p> Dates</p>
            <p></p>
        </div>
        </>
    )
}
