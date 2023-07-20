import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react';
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


    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId))
        dispatch(getReviewsBySpotThunk(spotId))
    }, [dispatch, reviews.length, spotId])



    const handleReserveButton = async(e) => {
        setErrors({})
        const newErrors = {}
        if (!startDate) newErrors.startDate = "Please choose a check-in date"
        if (!endDate) newErrors.endDate = "Please choose a check-out date"
        if (new Date(endDate).getTime() < new Date(startDate).getTime()) newErrors.invalidDates= 'Check-out date cannot be before check-in date.'

        if (Object.values(newErrors).length) {
            setErrors(newErrors)
            return
        }
        history.push(`/spots/${spotId}/bookings/${startDate}/${endDate}`)
    }

    let reviewText;
    if (spot.numReviews === 1) reviewText = 'review'
    else reviewText = 'reviews'


    let previewImgArr;
    let nonPreviewImgArr;

    if (spot.SpotImages && spot.SpotImages !== 'No spot images yet') {
        previewImgArr = spot.SpotImages.filter(image => image.preview === true)
        nonPreviewImgArr = spot.SpotImages.filter(image => image.preview === false)
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
        <>
            <header>
                <h1 id='spot-name'>{spot?.name}</h1>
                {spot.city && <p>{`${spot?.city}, ${spot?.state}, ${spot?.country}`}</p>}
            </header>

            <div className='images-container'>
                <div className='left-img'>
                    {previewImgArr && <img id='the-preview-img' src={previewImgArr[previewImgArr.length - 1]['url']} alt='preview of spot' />}
                </div>
                <div className='right-imgs'>
                    {nonPreviewImgArr && nonPreviewImgArr.map(image => image ? (<img className='not-preview-imgs' key={image.id} src={image.url} alt='more spot photos' />) : null)}
                </div>
            </div>
            <div className='Spot-info'>
                {spot.Owner && (
                    <div className='middle-section'>
                        <div className='text-info'>
                            <h2>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
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

                                <form>
                                    <div className='reserve-date-errors'>
                                        {errors.startDate && <p>{errors.startDate}</p>}
                                        {errors.endDate && <p>{errors.endDate}</p>}
                                        {errors.invalidDates && <p>{errors.invalidDates}</p>}
                                    </div>
                                    <div className='date-selection-wrapper'>
                                    <label>CHECK-IN
                                    <input className='check-in-out-date-inputs'
                                    type='date'
                                    onChange={(e) => setStartDate(e.target.value)}
                                    value={startDate}
                                    >
                                    </input>
                                    </label>

                                    <label>CHECK-OUT
                                    <input className='check-in-out-date-inputs'
                                    type='date'
                                    onChange={(e) => setEndDate(e.target.value)}
                                    value={endDate}
                                    >
                                    </input>
                                    </label>
                                    </div>

                                </form>
                                <div className='reserve-button-container'>
                                    <button id='reserve-btn' onClick={handleReserveButton}>Reserve</button>
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

                {notSpotOwner && currentUserReviewsOfSpot.length === 0 &&
                    <OpenModalButton
                        buttonText="Post Your Review"
                        modalComponent={<ReviewModal spotId={spotId} />}
                    />}




                {reviews.reverse().map(review => review ?

                    (
                        <div key={review?.id}>

                            <h3>{review.User?.firstName}</h3>
                            <p>{getMonthYear(review.createdAt)}</p>
                            <p>{review?.review}</p>

                            {sessionUser && review && review.userId === sessionUser.id && <OpenModalButton
                                buttonText="Delete Review"
                                modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotId} />}
                            />}
                        </div>

                    ) : null

                )}







            </div>
        </>
    )
}
