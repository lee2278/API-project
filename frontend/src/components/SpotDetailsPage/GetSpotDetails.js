import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSpotDetailsThunk } from '../../store/spots';
import './SpotDetailsPage.css'
import { getReviewsBySpotThunk } from '../../store/reviews';
export default function GetSpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const spot = useSelector(state => state.spots.singleSpot)
    const reviewsObj = useSelector(state => state.reviews.spot)
    const reviews = Object.values(reviewsObj);
    const sessionUser = useSelector(state => state.session.user);

    
   

    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId))
        dispatch(getReviewsBySpotThunk(spotId))
    }, [dispatch, spotId])





    const handleReserveButton = () => {
        alert('Feature coming soon')
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
    } else bottomDisplay = `${spot.avgStarRating} · ${spot.numReviews} reviews`
    
    if (!spot.avgStarRating || spot.avgStarRating === 'Not Available. No reviews yet') {
        boxDisplay = 'New'
    } else boxDisplay = spot.avgStarRating
    

    return (
        <>
            <header>
                <h1>{spot?.name}</h1>
                {spot.city && <p>{`${spot?.city}, ${spot?.state}, ${spot?.country}`}</p>}
            </header>

            <div className='images-container'>
                <div className='left-img'>
                    {previewImgArr && <img src={previewImgArr[previewImgArr.length - 1]['url']} alt='preview of spot' />}
                </div>
                <div className='right-imgs'>
                    {nonPreviewImgArr && nonPreviewImgArr.reverse().slice(0, 4).map(image => image ? (<img key={image.id} src={image.url} alt='more spot photos' />) : null)}
                </div>
            </div>
            <div className='Spot-info'>
                {spot.Owner && (
                    <div className='middle-section'>
                        <div className='text-info'>
                            <h2>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor qui neque blanditiis natus commodi tempora quaerat dolorem iusto, temporibus aperiam delectus fugiat alias accusamus accusantium, numquam, vel culpa corrupti atque.</p>
                        </div>
                        <div className='short-info-box'>
                            <div className='top-info'>
                                <p>{`$${spot.price} night`}</p>
                                <div className='rating'>
                                    <p><i className="fa-solid fa-star" style={{ color: '#000000' }}></i>
                                        {`${boxDisplay}`}</p>
                                </div>
                                <p className='some-dot'>·</p>
                                <p>{`${spot.numReviews} reviews`}</p>
                            </div>
                            <div className='reserve-button'>
                                <button onClick={handleReserveButton}>Reserve</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <div className='reviews-section'>
                <h2>
                    <i className="fa-solid fa-star" style={{ color: '#000000' }}></i>
                    {bottomDisplay}
                </h2>

                {reviews.reverse().map(review => (
                    <div key={review.id}>
                        <h3>{review.User.firstName}</h3>
                        <p>{getMonthYear(review.createdAt)}</p>
                        <p>{review.review}</p>
                    </div>
                ))}

            </div>
        </>
    )
}
