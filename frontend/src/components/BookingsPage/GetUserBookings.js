import { useEffect } from 'react'
import { getUserBookingsThunk } from '../../store/bookings'
import { useDispatch, useSelector } from 'react-redux'


export default function GetUserBookings() {
    const dispatch = useDispatch();

    const bookingsObj = useSelector(state => state.bookings.user)
    const bookingsList = Object.values(bookingsObj)

    console.log('bookingsList', bookingsList)

    const today = new Date().getTime()

    const currentBookingsList = bookingsList?.filter(booking => new Date(booking.startDate).getTime() > today)

    // console.log('current', currentBookingsList)

    const pastBookingsList = bookingsList?.filter(booking => new Date(booking.startDate).getTime() < today)


    const getMonthDayYear = (dateString => {
        const convertedDate = new Date(dateString)
        const optionsOfDateObj = { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' }
        return convertedDate.toLocaleString(undefined, optionsOfDateObj)
    })


    useEffect(() => {
        dispatch(getUserBookingsThunk())
    }, [dispatch])

    return (
        <>
            <div className='overall-wrapper'>
                <div>
                    <h2>Here are your bookings</h2>
                    <div className='current-bookings-div'>
                        <h3>Current Bookings</h3>
                        <div className='current-bookings-subdiv'>
                        {currentBookingsList && currentBookingsList.map(booking => (
                            <div className='booking-card'>
                                <div className='booking-card-left'>
                                    <div className='booking-card-image-container'>
                                        <img src={`${booking.Spot.previewImage}`} />
                                    </div>
                                </div>
                                <div className='booking-card-right'>
                                <p className='booking-spot-name'>{booking?.Spot.name}</p>
                                <p>{`${getMonthDayYear(booking.startDate)} - ${getMonthDayYear(booking.endDate)}`}</p>
                                <button>Edit Booking</button>
                                <button>Cancel Booking</button>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className='past-bookings-div'>
                        <h3>Past Bookings</h3>
                        <div className='past-bookings-subdiv'>
                        {pastBookingsList && pastBookingsList.map(booking => (
                            <div className='booking-card past'>
                                <div className='booking-card-left'>
                                    <div className='booking-card-image-container'>
                                        <img id='past-booking-img' src={`${booking.Spot.previewImage}`} />
                                    </div>
                                </div>
                                <div className='booking-card-right'>
                                    <p className='booking-spot-name'>{booking?.Spot.name}</p>
                                    <p>{`${getMonthDayYear(booking.startDate)} - ${getMonthDayYear(booking.endDate)}`}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
