import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import {createReviewThunk} from '../../store/reviews'
import { getReviewsBySpotThunk } from '../../store/reviews';

function ReviewModal({spotId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [review, setReview] = useState('')
    const [stars, setStars] = useState(1)

    const newReview = {
        review,
        stars: +stars,
        spotId
    }

    useEffect(() => {
        dispatch(getReviewsBySpotThunk(spotId))  
    }, [dispatch])

    const handleSubmit = () => {
       
        dispatch(createReviewThunk(newReview))
        closeModal()
 
    }


    

    return (
        <>
            <h1>How was your stay?</h1>
            <textarea
            placeholder='Leave your review here...'
            onChange={(e) => setReview(e.target.value)}
            value={review}
            >
{/* 
            {console.log('reviewtext', review)}  */}

            </textarea>


            <input onChange={(e) => setStars(e.target.value)}
            value={stars}
            >
            </input>

            {/* {console.log('stars', stars)} */}

            <button onClick={handleSubmit}>{`Submit Your Review`}</button>
          
        </>
    )

}


export default ReviewModal
