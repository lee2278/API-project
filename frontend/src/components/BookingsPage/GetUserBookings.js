import { useEffect } from 'react'
import {  getUserBookingsThunk } from '../../store/bookings'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton';
import DeleteBookingModal from './DeleteBookingModal';
import EditBookingModal from './EditBookingModal';


export default function GetUserBookings() {
    const dispatch = useDispatch();

    const bookingsObj = useSelector(state => state.bookings.user)
    const bookingsList = Object.values(bookingsObj)

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
                    <h2>Here are your booked trips</h2>
                    <div className='current-bookings-div'>
                        <h3>Scheduled Bookings</h3>
                        <div className='current-bookings-subdiv'>
                        {currentBookingsList && currentBookingsList.map(booking => (
                            <div key={booking.id} className='booking-card'>
                                <div className='booking-card-left'>
                                    <div className='booking-card-image-container'>
                                        <img src={`${booking.Spot.previewImage}`} />
                                    </div>
                                </div>
                                <div className='booking-card-right'>
                                <Link to={`/bookings/${booking.id}/${booking.Spot.id}/details`} className='booking-spot-name'>{booking?.Spot.name}</Link>
                                <p>{`${getMonthDayYear(booking.startDate)} - ${getMonthDayYear(booking.endDate)}`}</p>
                                <div className='edit-delete-booking-modal-container'>
                                <OpenModalButton
                                    buttonText = 'Edit Booking'
                                    modalComponent = {<EditBookingModal booking={booking}/>}
             
                                />
                                <OpenModalButton
                                    buttonText = 'Cancel Booking'
                                    modalComponent = {<DeleteBookingModal booking={booking}/>}
                                />
                                </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className='past-bookings-div'>
                        <h3>Past Bookings</h3>
                        <div className='past-bookings-subdiv'>
                        {pastBookingsList && pastBookingsList.map(booking => (
                            <div key={booking.id} className='booking-card past'>
                                <div className='booking-card-left'>
                                    <div className='booking-card-image-container'>
                                        <img id='past-booking-img' src={`${booking.Spot.previewImage}`} />
                                    </div>
                                </div>
                                <div className='booking-card-right'>
                                    <Link to={`/bookings/${booking.id}/${booking.Spot.id}/details`} className='booking-spot-name'>{booking?.Spot.name}</Link>
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
