import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { createReviewThunk,  } from '../../store/reviews'
import { getReviewsBySpotThunk } from '../../store/reviews';
import StarsRating from './StarsRating';
import './ReviewModal.css'
function ReviewModal({ spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState({})

    const newReview = {
        review,
        stars: +stars,
        spotId
    }

    useEffect(() => {
        dispatch(getReviewsBySpotThunk(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        const errorShown = {}
        if (review.length < 10) errorShown.review = 'Review must be at least 10 characters long'
        if (!stars) errorShown.stars = 'Please give a star rating'
        setErrors(errorShown)

    }, [review, stars])

    const handleSubmit = () => {
        dispatch(createReviewThunk(newReview))
        closeModal()
    }


    const onChange = (number) => {
        setStars(parseInt(number))
    }


    return (
        <>
            <h1>How was your stay?</h1>
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


export default ReviewModal
