import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserReviewsThunk } from '../../store/reviews';
import DeleteReviewModal from '../SpotDetailsPage/DeleteReviewModal';
import OpenModalButton from '../OpenModalButton';
import './UserReviews.css'
import UpdateReviewModal from '../ReviewModal/UpdateReviewModal';

export default function UserReviews() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserReviewsThunk())
    }, [dispatch])

    const reviewsObj = useSelector(state => state.reviews.user)
    const userReviewsList = Object.values(reviewsObj)

    const getMonthDayYear = (dateString => {
        const convertedDate = new Date(dateString)
        const optionsOfDateObj = { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' }
        return convertedDate.toLocaleString(undefined, optionsOfDateObj)
    })

    const turnNumToStars = (num => {
        if (num === 1) return (<><i className="fa-solid fa-star" style={{ color: "rgb(63, 106, 225)" }}></i></>)

        if (num === 2) return (<><i className="fa-solid fa-star" style={{ color: "rgb(63, 106, 225)" }}></i><i className="fa-solid fa-star" style={{ color: "rgb(63, 106, 225)" }}></i></>)

        if (num === 3) return (<><i className="fa-solid fa-star" style={{ color: "rgb(63, 106, 225)" }}></i><i className="fa-solid fa-star" style={{ color: "rgb(63, 106, 225)" }}></i><i className="fa-solid fa-star" style={{ color: "rgb(63, 106, 225)" }}></i></>)

        if (num === 4) return (<><i className="fa-solid fa-star" style={{ color: "rgb(63, 106, 225)" }}></i><i className="fa-solid fa-star" style={{ color: "rgb(63, 106, 225)" }}></i><i className="fa-solid fa-star" style={{ color: "rgb(63, 106, 225)" }}></i><i className="fa-solid fa-star" style={{ color: "rgb(63, 106, 225)" }}></i></>)

        if (num === 5) return (<><i className="fa-solid fa-star" style={{ color: "rgb(63, 106, 225)" }}></i><i className="fa-solid fa-star" style={{ color: "rgb(63, 106, 225)" }}></i><i className="fa-solid fa-star" style={{ color: "rgb(63, 106, 225)" }}></i><i className="fa-solid fa-star" style={{ color: "rgb(63, 106, 225)" }}></i><i className="fa-solid fa-star" style={{ color: "rgb(63, 106, 225)" }}></i></>)
    })


    return (
        <>
            <div>
                <h2>Your reviews</h2>
                {userReviewsList.length > 0 ? <div className='reviews-container'>
                    {userReviewsList && userReviewsList.map(review => (
                        <div className='reviews-card'>

                            <div className='spot-link-wrapper'>
                                <Link
                                    id='back-to-spot-details-link' to={`/spots/${review.Spot?.id}`}>
                                    <div className='spot-address-and-image-wrapper'>
                                        <img id='image-above-address' src={review.Spot?.previewImage} />
                                        <div className='address-holder'>
                                            <div className='bold'>Address:</div>
                                            <div className='address-wrapper'>
                                            <div id='spot-name-bold'>{review.Spot?.name}</div>
                                            <div>{review.Spot?.address}</div>
                                            <div> {`${review.Spot?.city}, ${review.Spot?.state}`}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className='reviews-info'>
                                <div className='text-rating-area'>
                                <div id='review-stars-container'>
                                    <p className='bold add-spacing'>Your rating: </p>
                                    <p>{turnNumToStars(review.stars)}</p>
                                
                                </div>
                                <div id='review-text'>
                                    <p className='bold add-spacing'>Review:</p>
                                    <p id='actual-review-text'>{review.review}</p>
                                </div>
                                <div id='date-posted-div'>
                                    <p className='bold add-spacing'>Date Posted:</p>
                                    <p>{getMonthDayYear(review.createdAt)}</p>
                                </div>
                                </div>
                                <div className='edit-delete-reviews-buttons-wrapper'>
                                    <div className='edit-user-review-modal-wrapper'>
                                        <OpenModalButton
                                            buttonText='Edit Review'
                                            modalComponent={<UpdateReviewModal reviewId={review.id} />}
                                        />
                                    </div>
                                    <div className='delete-user-review-modal-wrapper'>
                                        <OpenModalButton
                                            buttonText='Delete Review'
                                            modalComponent={<DeleteReviewModal reviewId={review.id} />}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>: <p>Looks like you have not made any reviews</p>}

            </div>
        </>
    )
}
