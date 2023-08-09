import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserBookingsThunk } from '../../store/bookings'
import { getSpotDetailsThunk } from '../../store/spots'

export default function BookingDetails() {
    const dispatch = useDispatch()
    const { bookingId, spotId } = useParams() //this is a string

    const userBookingsObj = useSelector(state => state.bookings.user)
    const particularBooking = userBookingsObj[bookingId]

    const spot = useSelector(state => state.spots.singleSpot)

    useEffect(() => {
        dispatch(getUserBookingsThunk())
        dispatch(getSpotDetailsThunk(+spotId))
    }, [dispatch])




    const getMonthDayYear = (dateString => {
        const convertedDate = new Date(dateString)
        const optionsOfDateObj = { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' }
        return convertedDate.toLocaleString(undefined, optionsOfDateObj)
    })

    const makePositive = num => num < 0 ? -num : num;


    const timeDifferenceInMilliseconds = new Date(particularBooking?.endDate).getTime() - new Date(particularBooking?.startDate).getTime()
    const daysOfTrip = makePositive(Math.ceil(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24)))

    let nightDisplayText;

    if (daysOfTrip === 1) {
        nightDisplayText = 'night'
    } else nightDisplayText = 'nights'

    //total prices
    const totalForStay = daysOfTrip * spot?.price
    const cleaningFee = totalForStay * 0.2
    const serviceFee = totalForStay * 0.15
    const taxes = totalForStay * 0.1

    const finalTotal = totalForStay + cleaningFee + serviceFee + taxes

    //rating area
    let ratingDisplay;

    if (!spot?.avgStarRating || spot?.avgStarRating === 'Not Available. No reviews yet') {
        ratingDisplay = 'New'
    } else ratingDisplay = spot?.avgStarRating

    //review area
    let reviewText;
    if (spot?.numReviews === 1) reviewText = 'review'
    else reviewText = 'reviews'




    return (
        <>
            <div>
                <h2>Booking Details</h2>

                {particularBooking && spot && <div className='booking-details-wrapper'>
                    <div className='booking-details-left'>
                        <div className='booking-image-container'>
                            <img src={particularBooking.Spot.previewImage} />
                        </div>
                        <div className='spot-specifics'>
                            <p id='spot-name-ptag'>{spot.name}</p>
                            <div className='address-div'>
                                <p id='address-label'>Address: </p>
                                <div>
                                    <p>{spot.address}
                                        <br />{`${spot.city}, ${spot.state}`} <br />{spot.country}</p>
                                </div>

                            </div>
                            <div>
                                {spot.Owner && <div className='host-div'>
                                    <p id='host-label'>Hosted by:</p>
                                    <p>{`${spot.Owner.firstName} ${spot.Owner.lastName}`}</p>

                                </div>}
                            </div>
                            <div>
                                <div className='dates-div'>
                                    <p id='date-label'>Trip dates:</p>
                                    <p>{`${getMonthDayYear(particularBooking.startDate)} - ${getMonthDayYear(particularBooking.endDate)}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='booking-details-right'>
                        <h2>Price details</h2>
                        <div className='price-explanation-line'>
                            {daysOfTrip && (typeof spot.price === 'float' || typeof spot.price === 'number') && <p>{`$${+spot.price?.toFixed(2)} x ${daysOfTrip} ${nightDisplayText}`}</p>}

                            {console.log(typeof spot.price)}
                            {console.log('spot.price', spot.price)}
                            {console.log('daysOfTrip', daysOfTrip)}

                            {/* {daysOfTrip && <p>{`$${spot?.price?.toFixed(2)} x ${daysOfTrip} ${nightDisplayText}`}</p>}
                            {console.log('spot.price after', spot.price)}
                            {console.log('daysOfTrip after', daysOfTrip)} */}


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



                </div>}
            </div>
        </>
    )
}
