import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import {createReviewThunk} from '../../store/reviews'
import { getReviewsBySpotThunk } from '../../store/reviews';

function ReviewModal({spotId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)

    const newReview = {
        review,
        stars,
        spotId
    }

    useEffect(() => {
        dispatch(getReviewsBySpotThunk(spotId))  
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createReviewThunk(newReview))
        closeModal()
 
    }


    return (
        <>
            <h1>How was your stay?</h1>
            <textarea
            placeholder='Just a quick review.'
            onChange={(e) => setReview(e.target.value)}
            value={review}
            >
            </textarea>
            <input onChange={(e) => setStars(e.target.value)}
            value={stars}
            
            ></input>
            <button onClick={handleSubmit}>{`Submit Your Review`}</button>
          
        </>
    )

}


export default ReviewModal
