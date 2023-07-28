import { useDispatch } from 'react-redux'
import { deleteBookingThunk, getUserBookingsThunk, getSpotBookingsThunk } from "../../store/bookings"
import { useModal } from '../../context/Modal'


export default function DeleteBookingModal({booking}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();


    const handleDeleteBooking = (e) => {
        e.preventDefault()
         dispatch(deleteBookingThunk(booking.id))
        closeModal()
        dispatch(getUserBookingsThunk())
    }

    return (
        <>
            <h1>Confirm Booking Cancellation</h1>
            <p>Are you sure you want to cancel this booking?</p>
            <button onClick={handleDeleteBooking}>{`Yes, cancel booking`}</button>
            <button onClick={closeModal}>{`No, keep this booking`}</button>
        </>
    )
}



export function DeleteBookingModal2({booking}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();


    const handleDeleteBooking = async(e) => {
        e.preventDefault()
        await dispatch(deleteBookingThunk(booking.id))
        closeModal()
        dispatch(getSpotBookingsThunk(booking.spotId))
    }

    return (
        <>
            <h1>Confirm Booking Cancellation</h1>
            <p>Are you sure you want to cancel this booking?</p>
            <button onClick={handleDeleteBooking}>{`Yes, cancel booking`}</button>
            <button onClick={closeModal}>{`No, keep this booking`}</button>
        </>
    )
}
