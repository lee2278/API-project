import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { getUserBookingsThunk } from '../../store/bookings'
import { getSpotDetailsThunk } from '../../store/spots'
import { createBookingThunk } from '../../store/bookings'
import OpenModalButton from '../OpenModalButton'
import EditDatesModal from './EditDatesModal'
import './Bookings.css'


export default function GetSpotBookings() {
    const dispatch = useDispatch()
    const history = useHistory()

    const {spotId, startDate, endDate } = useParams()

    const [bookingStart, setBookingStart] = useState(startDate)
    const [bookingEnd, setBookingEnd] = useState(endDate)

    const spot = useSelector(state => state.spots.singleSpot)

    useEffect(() => {
        dispatch(getUserBookingsThunk())
        dispatch(getSpotDetailsThunk(spotId))
    }, [dispatch])


    // date conversions
    const startDateObj = new Date(startDate)
    const endDateObj = new Date(endDate)

    const getMonthDayYear = (dateString => {
        const convertedDate = new Date(dateString)
        const optionsOfDateObj = {timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' }
        return convertedDate.toLocaleString(undefined, optionsOfDateObj)
    })


    const wordFormStartDate = getMonthDayYear(startDateObj)
    const wordFormEndDate = getMonthDayYear(endDateObj)

    // Figuring out number of days booked (so I can give a total price)

    const timeDifferenceInMilliseconds = endDateObj.getTime() - startDateObj.getTime()
    const daysOfTrip = Math.ceil(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24))

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

    
    
    const newBooking = {
        startDate: bookingStart,
        endDate: bookingEnd
    }


    const previewImage = spot?.SpotImages?.filter(spotImage => spotImage.preview === true)

    const handleBookingConfirmation = async(e) => {
        await dispatch(createBookingThunk(newBooking, spotId))
        history.push('/bookings/current')
    }


    return (
        <>
            <div className='bookings-page-wrapper'>
                <div className='bookings-page-subcontainer'>
                    <div className='bookings-left'>
                        <div>
                            <h2>Your trip</h2>
                            <p id='dates-header'> Dates</p>
                            <div className='date-and-edit-button-wrapper'>
                                <p>{`${wordFormStartDate} to ${wordFormEndDate}`}</p>
                                <OpenModalButton 
                                buttonText='Edit'
                                modalComponent={<EditDatesModal/>}/>
                            </div>
                        </div>
                        <div id='confirm-btn-wrapper'>
                        <button id='confirm-btn' onClick={handleBookingConfirmation}>Confirm Booking</button>
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
                                {daysOfTrip && <p>{`$${spot.price?.toFixed(2)} x ${daysOfTrip} ${nightDisplayText}`}</p>}
                                <p>{`$${totalForStay?.toFixed(2)}`}</p>
                            </div>
                            <div className='price-explanation-line'>
                                <p>Cleaning Fee</p>
                                <p>{`$${cleaningFee?.toFixed(2)}`}</p>
                            </div>
                            <div className='price-explanation-line'>
                                <p>Happybnb Service Fee</p>
                                <p>{`$${serviceFee?.toFixed(2)}`}</p>
                            </div>
                            <div className='price-explanation-line'>
                                <p>Taxes</p>
                                <p>{`$${taxes?.toFixed(2)}`}</p>
                            </div>
                            <div className='price-explanation-line final-total'>
                                <p>Total (USD)</p>
                                <p>{`$${finalTotal?.toFixed(2)}`}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
