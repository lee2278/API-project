import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { getUserReviewsThunk, updateReviewThunk } from '../../store/reviews';
import StarsRating from './StarsRating';
import './ReviewModal.css'

export default function UpdateReviewModal({ reviewId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState({})

    const reviewToUpdate = {
        id: reviewId,
        review,
        stars: +stars
    }


    useEffect(() => {
        const errorShown = {}
        if (review.length < 10) errorShown.review = 'Review must be at least 10 characters long'
        if (!stars) errorShown.stars = 'Please give a star rating'
        setErrors(errorShown)

    }, [review, stars])

    const handleSubmit = () => {
        dispatch(updateReviewThunk(reviewToUpdate))
        dispatch(getUserReviewsThunk())
        closeModal()
    }


    const onChange = (number) => {
        setStars(parseInt(number))
    }

    return (
        <>
        <h1>Edit your review?</h1>
            {errors && review.length >=1 && <p className='modal-errors'>{errors.review}</p>}
           
            <textarea
                placeholder='Leave your review here...'
                onChange={(e) => setReview(e.target.value)}
                value={review}
                rows='6'
            >
        
            </textarea>

            <StarsRating
                disabled={false}
                rating={stars}
                onChange={onChange}
            />
        
            <button id= 'review-submit-btn' onClick={handleSubmit} disabled={Object.values(errors).length > 0} >{`Submit Your Review`}</button>
        </>
    )
}
