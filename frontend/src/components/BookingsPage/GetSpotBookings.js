import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { getSpotBookingsThunk } from '../../store/bookings'
import { getSpotDetailsThunk } from '../../store/spots'
import { createBookingThunk } from '../../store/bookings'
import './Bookings.css'


export default function GetSpotBookings() {
    const dispatch = useDispatch()
    const history = useHistory()

    const { spotId, startDate, endDate } = useParams()

    const [bookingStart, setBookingStart] = useState(startDate)
    const [bookingEnd, setBookingEnd] = useState(endDate)
    const [errors, setErrors] = useState('')
    const [editClicked, setEditClicked] = useState(false)

    const spot = useSelector(state => state.spots.singleSpot)
    const spotBookingsObj = useSelector(state => state.bookings.spot)
    const spotBookingsList = Object.values(spotBookingsObj)

    useEffect(() => {
        dispatch(getSpotBookingsThunk(spotId))
        dispatch(getSpotDetailsThunk(spotId))
    }, [dispatch])


    // date conversions
    const startDateObj = new Date(bookingStart)
    const endDateObj = new Date(bookingEnd)
    const today = new Date()

    const getMonthDayYear = (dateString => {
        const convertedDate = new Date(dateString)
        const optionsOfDateObj = { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' }
        return convertedDate.toLocaleString(undefined, optionsOfDateObj)
    })


    const wordFormStartDate = getMonthDayYear(startDateObj)
    const wordFormEndDate = getMonthDayYear(endDateObj)

    // Figuring out number of days booked (so I can give a total price)
    const makePositive = num => num < 0 ? -num : num;

    const timeDifferenceInMilliseconds = endDateObj.getTime() - startDateObj.getTime()
    const daysOfTrip = makePositive(Math.ceil(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24)))




    let nightDisplayText;

    if (daysOfTrip === 1) {
        nightDisplayText = 'night'
    } else nightDisplayText = 'nights'

    //total prices
    
    const totalForStay = daysOfTrip * spot.price
    const cleaningFee = totalForStay * 0.2
    const serviceFee = totalForStay * 0.15
    const taxes = totalForStay * 0.1

    const finalTotal = totalForStay + cleaningFee + serviceFee + taxes




    //rating area
    let ratingDisplay;

    if (!spot.avgStarRating || spot.avgStarRating === 'Not Available. No reviews yet') {
        ratingDisplay = 'New'
    } else ratingDisplay = spot.avgStarRating

    //review area
    let reviewText;
    if (spot.numReviews === 1) reviewText = 'review'
    else reviewText = 'reviews'

    //getting the preview image
    const previewImage = spot?.SpotImages?.filter(spotImage => spotImage.preview === true)


    const newBooking = {
        startDate: bookingStart,
        endDate: bookingEnd
    }


    const handleEdit = () => {
        setEditClicked(true)
    }


    const handleBookingConfirmation = async (e) => {

        setErrors({})
        const newErrors = {}
        // endDate cannot be before startDate
        if (endDateObj.getTime() < startDateObj.getTime()) newErrors.endDate = 'Check-out date cannot be before check-in date'

        // startDate cannot be between existing bookings's start and endDates
        if (typeof spotBookingsList !== 'string' && spotBookingsList.length > 0) {
            spotBookingsList.forEach(booking => {
                let convertedStart = new Date(booking.startDate).getTime();
                let convertedEnd = new Date(booking.endDate).getTime();

                if (
                    ((startDateObj.getTime() >= convertedStart) && (startDateObj.getTime() <= convertedEnd))
                    ||
                    ((endDateObj.getTime() >= convertedStart) && (endDateObj.getTime() <= convertedEnd))
                ) {
                    newErrors.dateConflicts = "Sorry, this spot is already booked for one or more of the selected dates. Please choose other dates"
                }

            })

        }
        if (Object.values(newErrors).length) {
            setErrors(newErrors)
            setEditClicked(true)
            return
        }

        await dispatch(createBookingThunk(newBooking, spotId))
        history.push('/bookings/current')
    }



    const handleRedirect = () => {
        history.push(`/spots/${spotId}`)
    }



    return (
        <>
            <div className='bookings-page-wrapper'>
                <div className='bookings-page-subcontainer'>
                    <div className='bookings-left'>
                        <div>
                            <h2>Your trip</h2>
                            <p id='dates-header'> Dates</p>
                            <div className='date-and-edit-wrapper'>
                                <p>{`${wordFormStartDate} to ${wordFormEndDate}`}</p>
                                <div className='edit-hide-wrapper'>
                                    <button id='edit-date-btn' onClick={handleEdit}>Edit</button>
                                    {editClicked && <button id='hide-edit-date-btn' onClick={() => setEditClicked(false)}>Hide</button>}
                                </div>
                            </div>
                        </div>

                        <div className='booking-errors-div'>
                            {errors.endDate && <p>{errors.endDate}</p>}
                            {errors.dateConflicts && <p>{errors.dateConflicts}</p>}
                            {editClicked === true && (
                                <>
                                    <div className='edit-date-selections'>
                                        <div className='edit-date-selections-left'>
                                            <label>CHECK-IN
                                                <input className='check-in-out-date-inputs'
                                                    type='date'
                                                    onChange={(e) => setBookingStart(e.target.value)}
                                                    value={bookingStart}
                                                    min={today.toISOString().split('T')[0]}
                                                >
                                                </input>
                                            </label>
                                        </div>
                                        <div className='edit-date-selections-right'>
                                            <label>CHECK-OUT
                                                <input className='check-in-out-date-inputs'
                                                    type='date'
                                                    onChange={(e) => setBookingEnd(e.target.value)}
                                                    value={bookingEnd}
                                                    min={today.toISOString().split('T')[0]}
                                                >
                                                </input>
                                            </label>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className='confirm-cancel-btn-wrapper'>
                            <button id='go-back-btn'onClick={handleRedirect}>
                                <span className="material-symbols-outlined">
                                    cancel
                                </span>
                                Cancel Booking</button>
                            <button id='confirm-btn' onClick={handleBookingConfirmation}>
                                <span className="material-symbols-outlined">
                                    done
                                </span>
                                Confirm Booking</button>
                        </div>
                    </div>

                    <div className='bookings-right'>
                        <div className='spot-description-area'>
                            <div className='left-spot-description-area'>
                                {previewImage && <img src={previewImage[0]?.url} />}

                            </div>
                            <div className='right-spot-description-area'>
                                <p>{spot.name}</p>
                                <div>
                                    <i className="fa-solid fa-star" style={{ color: '#000000' }}></i>
                                    <span id='rating-display-span'>{ratingDisplay}</span>
                                    <span id='num-reviews-span'>{`(${spot.numReviews} ${reviewText})`}</span>
                                </div>
                            </div>
                        </div>
                        <div className='price-area'>
                            <h2>Price details</h2>

                            <div className='price-explanation-line'>
                                {daysOfTrip && <p>{`$${parseInt(spot.price).toFixed(2)} x ${daysOfTrip} ${nightDisplayText}`}</p>}
                                <p>{`$${totalForStay?.toFixed(2)}`}</p>
                            </div>
                            <div className='price-explanation-line'>
                                <p>Cleaning Fee</p>
                                {cleaningFee && typeof cleaningFee === 'number' && <p>{`$${cleaningFee?.toFixed(2)}`}</p>}
                            </div>
                            <div className='price-explanation-line'>
                                <p>Happybnb Service Fee</p>
                                {serviceFee && typeof serviceFee === 'number' && <p>{`$${serviceFee?.toFixed(2)}`}</p>}
                            </div>
                            <div className='price-explanation-line'>
                                <p>Taxes</p>
                                {taxes && typeof taxes === 'number' && <p>{`$${taxes?.toFixed(2)}`}</p>}
                            </div>
                            <div className='price-explanation-line final-total'>
                                <p>Total (USD)</p>
                                {finalTotal && typeof finalTotal === 'number' && <p>{`$${finalTotal?.toFixed(2)}`}</p>}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
