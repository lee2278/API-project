import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getReviewsThunk } from '../../store/reviews'

export default function GetReviews() {
    const dispatch = useDispatch();
    
    const spot = useSelector(state => state)
  
   
    return (
        <>
        </>
    )
}
