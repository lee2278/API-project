import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSpotBookingsThunk } from '../../store/bookings';
import { useParams } from 'react-router-dom'
import { DeleteBookingModal2 } from '../BookingsPage/DeleteBookingModal';
import OpenModalButton from '../OpenModalButton';
import './BookingsManagement.css'

export default function BookingsManagement() {
    const dispatch = useDispatch();

    const spotId = +useParams().spotId

    useEffect(() => {
        dispatch(getSpotBookingsThunk(spotId))

    }, [dispatch])

    const spotBookingsObj = useSelector(state => state.bookings.spot)

    const spotBookingsList = Object.values(spotBookingsObj)

    const today = new Date().getTime()

    const upcomingBookingsList = spotBookingsList?.filter(booking => new Date(booking.startDate).getTime() > today)

    const pastBookingsList = spotBookingsList?.filter(booking => new Date(booking.startDate).getTime() < today)

    const getMonthDayYear = (dateString => {
        const convertedDate = new Date(dateString)
        const optionsOfDateObj = { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' }
        return convertedDate.toLocaleString(undefined, optionsOfDateObj)
    })


    return (
        <>
            <div className='overall-wrapper'>

                <div>
                    <h2>Your Spot's Bookings</h2>
                    <div className='upcoming-bookings-div'>
                        <h3>Upcoming</h3>
                        {upcomingBookingsList?.length ? <div className='upcoming-bookings-subdiv'>
                            {upcomingBookingsList && upcomingBookingsList.map(booking => (
                                <div key={booking.id} className='booking-card owner'>
                                    <div>
                                        <p>{`Dates: ${getMonthDayYear(booking.startDate)} - ${getMonthDayYear(booking.endDate)}`}</p>
                                        <p>{`Booked By: ${booking.User.firstName} ${booking.User.lastName}`}</p>
                                    </div>
                                    <div className='cancel-booking-modal-wrapper2'>
                                    <OpenModalButton
                                        buttonText='Cancel this booking'
                                        modalComponent={<DeleteBookingModal2 booking={booking}/>}
                                    />
                                    </div>
                                </div>
                            ))}
                        </div> : <p>No upcoming bookings right now</p>}
                    </div>

                    <div className='past-bookings-div'>
                        <h3>Past Bookings</h3>
                        {pastBookingsList?.length ? <div className='past-bookings-subdiv'>
                            {pastBookingsList && pastBookingsList.map(booking => (
                                <div key={booking.id} className='booking-card'>
                                    <div>
                                        <p>{`Dates: ${getMonthDayYear(booking.startDate)} - ${getMonthDayYear(booking.endDate)}`}</p>
                                        <p>{`Booked By: ${booking.User.firstName} ${booking.User.lastName}`}</p>
                                    </div>
                                </div>
                            ))}
                        </div> : <p>No past bookings exist for this spot</p>}
                    </div>

                </div>
            </div>
        </>
    )
}
