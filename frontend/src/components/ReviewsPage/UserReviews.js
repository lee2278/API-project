import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
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

    return (
        <>
            <div>
                <h2>Your reviews</h2>
                <div>
                    <table id='review-table'>
                        <tr>
                            <th>Rating</th>
                            <th>Review</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                        {userReviewsList && userReviewsList.map(review => (
                            <tr>
                                <td>{review.stars}</td>
                                <td>{review.review}</td>
                                <td>{getMonthDayYear(review.createdAt)}</td>
                                <td>
                                    <OpenModalButton
                                        buttonText='Edit Review'
                                        modalComponent={<UpdateReviewModal reviewId={review.id}/>}
                                    />
                                    <OpenModalButton
                                        buttonText='Delete Review'
                                        modalComponent={<DeleteReviewModal reviewId={review.id}/>}
                                    />
                                </td>
                            </tr>
                        ))}

                    </table>
                </div>
            </div>
        </>
    )
}
