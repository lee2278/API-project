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
                <div className='table-container'>
                    {userReviewsList?.length > 0 ? <table id='review-table'>
                        <thead>
                            <tr>
                                <th id='rating-th'>Rating</th>
                                <th id='review-th'>Review</th>
                                <th id='date-th'>Date Posted</th>
                                <th id='spot-th'>Spot</th>
                                <th id='empty-th'>Edit/ Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userReviewsList && userReviewsList.map(review => (
                                <tr key={review.id}>
                                    <td>{turnNumToStars(review.stars)}</td>
                                    <td id='review-text-td'>{review.review}</td>
                                    <td>{getMonthDayYear(review.createdAt)}</td>
                                    <td id='spot-td'>
                                        <Link
                                            id='back-to-spot-details-link' to={`/spots/${review.Spot.id}`}>
                                            <div className='spot-address-and-image-wrapper'>
                                            <img id='image-above-address'src={review.Spot.previewImage}/>
                                            <div>
                                                <div id='spot-name-bold'>{review.Spot.name}</div>
                                                <div>{review.Spot.address}</div>
                                                <div> {`${review.Spot.city}, ${review.Spot.state}`}</div>
                                            </div>
                                            </div>
                                        </Link>
                                    </td>
                                    <td>
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> : <p>You have not posted any reviews</p>}
                </div>
            </div>
        </>
    )
}
