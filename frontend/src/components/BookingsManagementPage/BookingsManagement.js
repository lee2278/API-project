import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSpotBookingsThunk } from '../../store/bookings';
import { useParams } from 'react-router-dom'


export default function BookingsManagement() {
    const dispatch = useDispatch();

    const  spotId = +useParams().spotId


    useEffect(() => {
        dispatch(getSpotBookingsThunk(spotId))
    }, [dispatch])

    const spotBookingsObj = useSelector(state => state.bookings.spot)

    const spotBookingsList = Object.values(spotBookingsObj)
    
    console.log('spotBookingsObj', spotBookingsObj)
    console.log('spotBookingsList', spotBookingsList)


    console.log(spotBookingsObj)
    return(
        <>
        <h2>Your Spot's Bookings</h2>
        <div>
            
        </div>
        </>
    )
}
