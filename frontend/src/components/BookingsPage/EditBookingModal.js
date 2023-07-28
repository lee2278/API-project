
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getUserBookingsThunk, updateBookingThunk, getSpotBookingsThunk } from '../../store/bookings';
import { useModal } from '../../context/Modal'



export default function EditBookingModal({ booking }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const [startDate, setStartDate] = useState(booking.startDate.split('T')[0])
    const [endDate, setEndDate] = useState(booking.endDate.split('T')[0])
    const [errors, setErrors] = useState({})


    const spotBookingsObj = useSelector(state => state.bookings.spot)

    const spotBookingsList = Object.values(spotBookingsObj)

    
    const today = new Date()
    
    const updatedBooking = {
        id: booking.id,
        startDate,
        endDate
    }
    
    const filteredSpotBookings = spotBookingsList.filter(spotBooking => spotBooking.startDate !== booking.startDate)


    useEffect(() => {
        dispatch(getSpotBookingsThunk(booking.Spot.id))
        // dispatch(getUserBookingsThunk())
    }, [dispatch])


    const handleEditBooking = async (e) => {
        e.preventDefault()
        setErrors({})
        const newErrors = {}

        if ((new Date(startDate).getTime() < today.getTime()) || (new Date(endDate).getTime() < today.getTime())) newErrors.oldDate = 'Cannot set booking to a date in the past'

        if (new Date(endDate).getTime() < new Date(startDate).getTime()) newErrors.endDate = 'Check-out date cannot be before check-in date'

        if (typeof filteredSpotBookings !== 'string' && filteredSpotBookings.length > 0) {
            filteredSpotBookings.forEach(spotBooking => {
                let convertedStart = new Date(spotBooking.startDate).getTime();
                let convertedEnd = new Date(spotBooking.endDate).getTime();

                if (
                    ((new Date(startDate).getTime() >= convertedStart) && (new Date(startDate).getTime() <= convertedEnd))
                    ||
                    ((new Date(endDate).getTime() >= convertedStart) && (new Date(endDate).getTime() <= convertedEnd))
                ) {
                    newErrors.dateConflicts = "Sorry, this spot is already booked for one or more of the selected dates. Please choose other dates"
                }

            })

        }

        




        if (Object.values(newErrors).length) {
            setErrors(newErrors)
            return
        }

        await dispatch(updateBookingThunk(updatedBooking))
        closeModal()
        dispatch(getUserBookingsThunk())

    }
    return (
        <>
            <h1>Edit Booking</h1>
            <div className='div-under-edit-booking'>
            <div className='booking-errors-div'>
                {errors.endDate && <p>{errors.endDate}</p>}
                {errors.dateConflicts && <p id='date-conflicts-ptag'>{errors.dateConflicts}</p>}
                {errors.oldDate && <p>{errors.oldDate}</p>}
            </div>
            <div className='edit-date-selections'>
                <div className='edit-date-selections-left'>
                    <label>CHECK-IN
                        <input className='check-in-out-date-inputs'
                            type='date'
                            onChange={(e) => setStartDate(e.target.value)}
                            value={startDate}
                            min={today.toISOString().split('T')[0]}
                        >
                        </input>
                    </label>
                </div>
                <div className='edit-date-selections-right'>
                    <label>CHECK-OUT
                        <input className='check-in-out-date-inputs'
                            type='date'
                            onChange={(e) => setEndDate(e.target.value)}
                            value={endDate}
                            min={today.toISOString().split('T')[0]}
                        >
                        </input>
                    </label>
                </div>
            </div>
            </div>
            <button onClick={handleEditBooking}>Save</button>
            <button onClick={() => closeModal()}>Cancel</button>
        </>
    )
}
