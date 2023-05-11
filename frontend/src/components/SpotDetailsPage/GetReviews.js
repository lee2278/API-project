import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getReviewsBySpotThunk } from '../../store/reviews'

export default function GetReviews() {
    const dispatch = useDispatch();
    
    dispatch(getReviewsBySpotThunk())
  
   
    return (
        <>
        </>
    )
}
