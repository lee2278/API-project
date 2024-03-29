import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSpotDetailsThunk } from '../../store/spots';
import './SpotDetailsPage.css'
import { getReviewsBySpotThunk } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import ReviewModal from '../ReviewModal/ReviewModal';
import DeleteReviewModal from './DeleteReviewModal';



export default function GetSpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory()

    const spot = useSelector(state => state.spots.singleSpot)
    const reviewsObj = useSelector(state => state.reviews.spot)
    const reviews = Object.values(reviewsObj);
    const sessionUser = useSelector(state => state.session.user);

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [errors, setErrors] = useState('')

    const today = new Date()

    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId))
        dispatch(getReviewsBySpotThunk(spotId))
    }, [dispatch, reviews.length, spotId])


    const handleReserveButton = async (e) => {
        setErrors({})
        const newErrors = {}
        if (!sessionUser) newErrors.sessionUser = "Please log in or sign-up to reserve"
        if (!startDate) newErrors.startDate = "Please choose a check-in date"
        if (!endDate) newErrors.endDate = "Please choose a check-out date"
        if (new Date(endDate).getTime() < new Date(startDate).getTime()) newErrors.invalidDates = 'Check-out date cannot be before check-in date.'
        if (new Date(startDate).getTime() < today.getTime()) newErrors.invalidStart = "Cannot choose a check-in date in the past"
        if (new Date(endDate).getTime() < today.getTime()) newErrors.invalidEnd = "Cannot choose a check-out date in the past"

        if (Object.values(newErrors).length) {
            setErrors(newErrors)
            return
        }
        history.push(`/spots/${spotId}/bookings/${startDate}/${endDate}`)
    }


    const handleSeeReservationsButton = (e) => {
        e.preventDefault()
        history.push(`/spots/${spotId}/confirmed-bookings`)
    }


    let reviewText;
    if (spot.numReviews === 1) reviewText = 'review'
    else reviewText = 'reviews'

    const noImageUrl = 'https://happybnb.s3.us-west-1.amazonaws.com/1690529375310.jpg'

    let previewImgArr;
    let nonPreviewImgArr;

    if (spot.SpotImages && spot.SpotImages !== 'No spot images yet') {
        previewImgArr = spot.SpotImages.filter(image => image.preview === true)
        nonPreviewImgArr = spot.SpotImages.filter(image => image.preview === false)
    }

    while (nonPreviewImgArr?.length < 4) {
        nonPreviewImgArr.push({url:noImageUrl, preview: false})
    }

    const getMonthYear = (dateString => {
        const convertedDate = new Date(dateString)
        const optionsOfDateObj = { year: 'numeric', month: 'long' }
        return convertedDate.toLocaleString(undefined, optionsOfDateObj)
    })


    let bottomDisplay;
    let boxDisplay;

    if (sessionUser && sessionUser.id !== spot.ownerId && spot.numReviews === 0) {
        bottomDisplay = 'Be the first to post a review!'
    } else if (!spot.avgStarRating || spot.avgStarRating === 'Not Available. No reviews yet') {
        bottomDisplay = 'New'
    } else bottomDisplay = `${spot.avgStarRating} · ${spot.numReviews} ${reviewText}`

    if (!spot.avgStarRating || spot.avgStarRating === 'Not Available. No reviews yet') {
        boxDisplay = 'New'
    } else boxDisplay = spot.avgStarRating





    let notSpotOwner;
    if (sessionUser && sessionUser.id !== spot.ownerId) notSpotOwner = true;

    let currentUserReviewsOfSpot
    if (sessionUser && Array.isArray(reviews)) {
        currentUserReviewsOfSpot = reviews.filter(review => review.userId === sessionUser.id)
    }



    return (
        <div className='spot-details-everything-wrapper'>
            <header className='spot-details-header'>
                <h1 id='spot-name'>{spot?.name}</h1>
                {spot.city && <p>{`${spot?.city}, ${spot?.state}, ${spot?.country}`}</p>}
            </header>
            <div className='outer-images-container'>
                <div className='images-container'>
                    <div className='left-img'>
                        {previewImgArr && previewImgArr[previewImgArr.length - 1]?.url &&<img id='the-preview-img' src={previewImgArr[previewImgArr.length - 1]['url']} alt='preview of spot' />}

                    </div>
                    <div className='right-imgs'>
                        <div className='right-imgs-inner'>
                        {nonPreviewImgArr && nonPreviewImgArr.map(image => image ? (
                            <div className='individual-img-containers'key={image.id}>
                                <img className='not-preview-imgs'  src={image.url} alt='more spot photos' />
                            </div>
                        ) : null)}
                       </div> 
                    </div>
                </div>
            </div>
            <div className='Spot-info'>
                {spot.Owner && (
                    <div className='middle-section'>
                        <div className='text-info'>
                            {sessionUser && sessionUser.id === spot.ownerId ? <h2>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName} (you)`}</h2> :
                                <h2>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>}
                            <p>{spot.description}</p>
                        </div>
                        <div className='info-box-section'>
                            <div className='short-info-box'>
                                <div className='top-info'>
                                    <p id='price-section'>{`$${spot.price} night`}</p>
                                    <div className='rating'>
                                        <p><i className="fa-solid fa-star" style={{ color: '#000000' }}></i>
                                            {` ${boxDisplay}`}</p>

                                        {spot.numReviews !== 0 && <p>{` · ${spot.numReviews} ${reviewText}`}</p>}

                                    </div>


                                </div>

                                {sessionUser && sessionUser.id === spot.ownerId
                                    ?
                                    <></>
                                    : <form id='reserve-area-form'>
                                        <div className='reserve-date-errors'>
                                            {errors.sessionUser && <p>{errors.sessionUser}</p>}
                                            {errors.startDate && <p>{errors.startDate}</p>}
                                            {errors.endDate && <p>{errors.endDate}</p>}
                                            {errors.invalidDates && <p>{errors.invalidDates}</p>}
                                            {errors.invalidStart && <p>{errors.invalidStart}</p>}
                                            {errors.invalidEnd && <p>{errors.invalidEnd}</p>}
                                        </div>
                                        <div className='date-selection-wrapper'>
                                            <label id='checkin-label'>CHECK-IN
                                                <input className='check-in-out-date-inputs'
                                                    type='date'
                                                    onChange={(e) => setStartDate(e.target.value)}
                                                    value={startDate}
                                                    min={today.toISOString().split('T')[0]}
                                                >
                                                </input>
                                            </label>

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

                                    </form>}
                                <div className='reserve-button-container'>
                                    {sessionUser && sessionUser.id === spot.ownerId
                                        ?
                                        <button id='see-spot-reservations-btn' onClick={handleSeeReservationsButton}>See this spot's Reservations</button>
                                        :
                                        <button id='reserve-btn' onClick={handleReserveButton}>Reserve</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <div className='reviews-section'>
                <h2>
                    <i className="fa-solid fa-star" style={{ color: '#000000' }}></i>
                    {`${bottomDisplay}`}
                </h2>

                <div className='post-review-btn'>
                    {notSpotOwner && currentUserReviewsOfSpot.length === 0 &&

                        <OpenModalButton
                            buttonText="Post Your Review"
                            modalComponent={<ReviewModal spotId={spotId} />}
                        />}
                </div>



                {reviews.reverse().map(review => review ?

                    (
                        <div key={review?.id}>

                            <h3>{review.User?.firstName}</h3>
                            <p>{getMonthYear(review.createdAt)}</p>
                            <p id='review-text-spot-details'>{review?.review}</p>

                            {sessionUser && review && review.userId === sessionUser.id && (
                            <div className='delete-review-modal-wrapper'>
                            <OpenModalButton
                                buttonText="Delete Review"
                                modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotId} />}
                            />
                            </div>
                            )}
                        </div>

                    ) : null

                )}







            </div>
        </div>
    )
}
