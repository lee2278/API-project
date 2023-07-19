import { useEffect } from 'react'
import { getUserBookingsThunk } from '../../store/bookings'
import { useDispatch, useSelector  } from 'react-redux'

export default function GetUserBookings() {
    const dispatch = useDispatch();

    const bookingsObj = useSelector(state => state.bookings.user)


    const bookingsList = Object.values(bookingsObj)

    console.log('bookingsList', bookingsList)

    useEffect(() => {
        dispatch(getUserBookingsThunk())
    }, [dispatch])

    return (
        <>
        <div className='overall-wrapper'>
            <div>Your Bookings

            </div>
        </div>
        </>
    )
}
